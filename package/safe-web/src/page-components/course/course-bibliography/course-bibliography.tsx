import React from "react";
import { useTranslate } from "@tolgee/react";
import type { IBibliography } from "../../../types/course";
import styles from "./course-bibliography.module.scss";

interface CourseBibliographyProps {
    bibliography?: IBibliography[];
}

const CourseBibliography: React.FC<CourseBibliographyProps> = ({ bibliography = [] }) => {
    const { t } = useTranslate();

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{t("active.course.hub.bibliography.button")}</h2>
            <div className={styles.list}>
                {bibliography.length > 0 && (
                    bibliography.map((item, idx) => (
                        <div key={`bib-${idx}`} className={styles.item}>
                            <p><strong>{item.title}</strong></p>
                            {item.url && (
                                <a href={item.url} target="_blank" rel="noopener noreferrer">
                                    {item.url}
                                </a>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CourseBibliography;
