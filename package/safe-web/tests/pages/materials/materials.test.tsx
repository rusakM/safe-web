import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import Materials from '../../../src/pages/materials/materials';
import { renderWithProviders } from '../../test-utils';
import { LocalesEnum } from '../../../src/helpers/constants/translations';
import type { IMaterial } from '../../../src/types/material';

vi.mock('react-pdf', () => ({
    Document: ({ children }: any) => <div>{children}</div>,
    Page: () => <div>PDF Page Mock</div>,
    pdfjs: { GlobalWorkerOptions: { workerSrc: '' } },
}));

const mockMaterial: IMaterial = {
    _id: 'mat-1',
    materialNumber: 1,
    names: {
        [LocalesEnum.en]: { name: 'guide.pdf', pages: 3 },
        [LocalesEnum.pl]: { name: 'guide.pdf', pages: 3 },
        [LocalesEnum.el]: { name: 'guide.pdf', pages: 3 },
        [LocalesEnum.fr]: { name: 'guide.pdf', pages: 3 },
        [LocalesEnum.it]: { name: 'guide.pdf', pages: 3 },
        [LocalesEnum.pt]: { name: 'guide.pdf', pages: 3 },
        [LocalesEnum.sl]: { name: 'guide.pdf', pages: 3 },
        [LocalesEnum.sv]: { name: 'guide.pdf', pages: 3 },
    },
    translation: 'guide',
};

describe('Materials Page', () => {
    beforeEach(() => {
        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            blob: () => Promise.resolve(new Blob(['pdf content'])),
        } as any);
        globalThis.URL.createObjectURL = vi.fn().mockReturnValue('blob:mock-url');
        globalThis.URL.revokeObjectURL = vi.fn();
    });

    it('should render header and materials list', () => {
        renderWithProviders(<Materials />, {
            preloadedState: {
                materials: {
                    materials: [mockMaterial],
                    isLoading: false,
                    error: null,
                } as any,
            },
        });

        expect(screen.getByText('manuals.header')).toBeInTheDocument();
        expect(screen.getByText('landing-page.carousel.fake-news')).toBeInTheDocument();
    });

    it('should open and close Flipbook viewer when resize action is clicked', () => {
        renderWithProviders(<Materials />, {
            preloadedState: {
                materials: {
                    materials: [mockMaterial],
                    isLoading: false,
                    error: null,
                } as any,
            },
        });

        // Click on the resize/open button of the first card
        const resizeBtns = screen.getAllByTitle('manuals.placeholder.open');
        expect(resizeBtns.length).toBeGreaterThan(0);
        fireEvent.click(resizeBtns[0]);

        // Flipbook should be open now with pagination
        expect(screen.getByText('1/3')).toBeInTheDocument();

        // Close flipbook
        const closeBtn = screen.getByLabelText('Close');
        fireEvent.click(closeBtn);

        // Flipbook should be closed
        expect(screen.queryByText('1/3')).not.toBeInTheDocument();
    });
});
