import { useState, useEffect, useCallback, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import type { IMaterial } from '../../types/material';
import { LocalesEnum } from '../../helpers/constants/translations';
import styles from './flipbook.module.scss';
import commonStyles from '../../styles/common.module.scss';

import BtnNext from '../../assets/icons/next.svg';
import BtnPrev from '../../assets/icons/prev.svg';
import BtnClose from '../../assets/icons/close_gradient.svg';
import BtnZoomIn from '../../assets/icons/zoom_in.svg';
import BtnZoomOut from '../../assets/icons/zoom_out.svg';
import BtnDownload from '../../assets/icons/download.svg';
import { downloadFile } from '../../helpers/events.functions';
import { getCurrentLocale } from '../../translations/utils';
import { getMaterialPageUrl, getMaterialUrl } from '../../helpers/materials.functions';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const ZOOM_STEP = 0.2;
const ZOOM_MIN = 0.5;
const ZOOM_MAX = 3.0;
const DEFAULT_ZOOM = 1.0;
const PREFETCH_PAGES = 2;

async function fetchPdf(url: string, lang: string, page: number): Promise<Blob> {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept-Language': lang,
            'X-Page': String(page),
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.statusText}`);
    }

    return response.blob();
}

interface FlipbookProps {
    material: IMaterial;
    onClose?: () => void;
}

export const Flipbook = ({ material, onClose }: FlipbookProps) => {
    const lang = getCurrentLocale();
    const totalPages = material?.names?.[lang]?.pages ?? material?.names?.[LocalesEnum.en]?.pages ?? 0;

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [zoom, setZoom] = useState<number>(DEFAULT_ZOOM);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Cache: page number -> object URL
    const cacheRef = useRef<Map<number, string>>(new Map());
    // Track in-flight fetches to avoid duplicate requests
    const inflightRef = useRef<Set<number>>(new Set());

    const fetchPage = useCallback(async (page: number): Promise<string> => {
        const cached = cacheRef.current.get(page);
        if (cached) return cached;

        if (inflightRef.current.has(page)) {
            // Wait until the in-flight request lands in cache
            return new Promise((resolve, reject) => {
                const interval = setInterval(() => {
                    const url = cacheRef.current.get(page);
                    if (url) {
                        clearInterval(interval);
                        resolve(url);
                    }
                }, 50);
                setTimeout(() => {
                    clearInterval(interval);
                    reject(new Error(`Timeout waiting for page ${page}`));
                }, 10000);
            });
        }

        inflightRef.current.add(page);
        try {
            const blob = await fetchPdf(getMaterialPageUrl(material, lang, page), lang, page);
            const objectUrl = URL.createObjectURL(blob);
            cacheRef.current.set(page, objectUrl);
            return objectUrl;
        } finally {
            inflightRef.current.delete(page);
        }
    }, [material, lang]);

    // Load current page
    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const url = await fetchPage(currentPage);
                if (!cancelled) setPdfUrl(url);
            } catch (err) {
                if (!cancelled) setError('Cannot fetch pdf document.');
                console.error(err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();

        return () => { cancelled = true; };
    }, [currentPage, fetchPage]);

    // Prefetch neighbouring pages silently in background
    useEffect(() => {
        const pagesToPrefetch: number[] = [];

        for (let i = 1; i <= PREFETCH_PAGES; i++) {
            if (currentPage + i <= totalPages) pagesToPrefetch.push(currentPage + i);
            if (currentPage - i >= 1) pagesToPrefetch.push(currentPage - i);
        }

        pagesToPrefetch.forEach(page => {
            if (!cacheRef.current.has(page) && !inflightRef.current.has(page)) {
                fetchPage(page).catch(() => {
                    // prefetch failures are silent
                });
            }
        });
    }, [currentPage, totalPages, fetchPage]);

    // Revoke all object URLs on unmount
    useEffect(() => {
        const cache = cacheRef.current;
        return () => {
            cache.forEach(url => URL.revokeObjectURL(url));
            cache.clear();
        };
    }, []);

    const goToPrev = useCallback(() => {
        setCurrentPage(p => Math.max(1, p - 1));
    }, []);

    const goToNext = useCallback(() => {
        setCurrentPage(p => Math.min(totalPages, p + 1));
    }, [totalPages]);

    const zoomIn = useCallback(() => {
        setZoom(z => Math.min(ZOOM_MAX, parseFloat((z + ZOOM_STEP).toFixed(2))));
    }, []);

    const zoomOut = useCallback(() => {
        setZoom(z => Math.max(ZOOM_MIN, parseFloat((z - ZOOM_STEP).toFixed(2))));
    }, []);

    const handleDownload = useCallback(() => {
        downloadFile(getMaterialUrl(material, lang));
    }, [material, lang]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') goToPrev();
            else if (e.key === 'ArrowRight') goToNext();
            else if (e.key === 'Escape') onClose?.();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [goToPrev, goToNext, onClose]);

    return (
        <div className={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}>
            <div className={styles.modal}>

                <div className={styles.toolbar}>
                    <div className={styles.toolbarLeft}>
                        <button
                            className={styles.iconBtn}
                            onClick={zoomOut}
                            disabled={zoom <= ZOOM_MIN}
                            aria-label="Zoom out"
                        >
                            <img src={BtnZoomOut} alt="zoom out" />
                        </button>
                        <button
                            className={styles.iconBtn}
                            onClick={zoomIn}
                            disabled={zoom >= ZOOM_MAX}
                            aria-label="Zoom in"
                        >
                            <img src={BtnZoomIn} alt="zoom in" />
                        </button>
                    </div>

                    <div className={styles.toolbarCenter}>
                        <button
                            className={styles.iconBtn}
                            onClick={goToPrev}
                            disabled={currentPage <= 1}
                            aria-label="Prev page"
                        >
                            <img src={BtnPrev} alt="prev" />
                        </button>
                        <span className={`${styles.pageIndicator} ${commonStyles.basicText}`}>
                            {currentPage}/{totalPages || '—'}
                        </span>
                        <button
                            className={styles.iconBtn}
                            onClick={goToNext}
                            disabled={currentPage >= totalPages}
                            aria-label="Next page"
                        >
                            <img src={BtnNext} alt="next" />
                        </button>
                    </div>

                    <div className={styles.toolbarRight}>
                        <button
                            className={styles.iconBtn}
                            onClick={handleDownload}
                            aria-label="Download"
                        >
                            <img src={BtnDownload} alt="Download" />
                        </button>
                        <button
                            className={styles.iconBtn}
                            onClick={onClose}
                            aria-label="Close"
                        >
                            <img src={BtnClose} alt="Close" />
                        </button>
                    </div>
                </div>

                <div className={styles.viewer}>
                    {loading && (
                        <div className={styles.status}>Loading...</div>
                    )}
                    {error && (
                        <div className={styles.status}>{error}</div>
                    )}
                    {pdfUrl && !loading && (
                        <Document file={pdfUrl} loading={null}>
                            <Page pageNumber={1} scale={zoom} loading={null} />
                        </Document>
                    )}
                </div>

            </div>
        </div>
    );
};