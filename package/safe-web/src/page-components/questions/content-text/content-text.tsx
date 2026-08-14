import React from "react";
import { useTranslate } from "@tolgee/react";
import type { IQuestionComponentProps } from "../questions.types";
import styles from "./content-text.module.scss";

const ContentText: React.FC<IQuestionComponentProps> = ({ question }) => {
    const { t } = useTranslate();
    const textToDisplay = question.description || question.question || "";
    const mediaList = question.media || [];
    const hasMedia = mediaList.length > 0;

    return (
        <div className={`${styles.container} ${hasMedia ? styles.hasMedia : ""}`}>
            {hasMedia && (
                <div className={styles.mediaSection}>
                    {mediaList.map((item, index) => (
                        <div key={`media-${index}`} className={styles.mediaItem}>
                            {item.url && (
                                <img
                                    src={item.url}
                                    alt={item.name || `Slide Media ${index + 1}`}
                                    className={styles.image}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
            <div className={styles.textSection}>
                <p className={styles.textContent}>
                    {t(textToDisplay)}
                </p>
            </div>
        </div>
    );
};

export default ContentText;
