import React from "react";
import { useTranslate } from "@tolgee/react";
import PrimaryContainer from "../primary-container/primary-container";

import styles from "./course-header.module.scss";

import ArrowNext from "../../assets/icons/game_arrow_next.svg";
import ArrowBack from "../../assets/icons/game_arrow_back.svg";
import Bibliography from "../../assets/icons/bibliography.svg";

interface ICourseHeader {
    customTitle?: string;
    goBack?: () => void;
    goNext?: () => void;
    module: number;
    openBibliography?: () => void;
    section: number;
    showBibliography?: boolean;
    showNextButton?: boolean;
}

const CourseHeader: React.FC<ICourseHeader> = ({
    customTitle,
    goBack,
    goNext,
    module,
    openBibliography,
    section,
    showBibliography = false,
    showNextButton,
}) => {
    const { t } = useTranslate();

    const moduleLabel = module > 0
        ? `${t(`active.course.navigation.module.${module}`).toUpperCase()}, ${t(`active.course.navigation.section.${section}`).toUpperCase()}`
        : "";

    const titleText = customTitle || (module > 0 ? t(`active.course.hub.module.title.${module}`) : "");

    const shouldShowNext = typeof showNextButton === "boolean" ? showNextButton : !showBibliography;

    return (
        <PrimaryContainer direction="column" additionalClassess={styles.courseHeaderOutline}>
            <div className={styles.courseHeaderContainer}>
                <div className={styles.controlsRow}>
                    <button className={styles.courseButton} onClick={goBack} type="button">
                        <img src={ArrowBack} alt="back" />
                        <span>{moduleLabel}</span>
                    </button>

                    {shouldShowNext ? (
                        <button className={styles.courseButton} onClick={goNext} type="button">
                            <span>{t("active.course.hub.next.page.button", "Dalej")}</span>
                            <img src={ArrowNext} alt="next" />
                        </button>
                    ) : (
                        <button className={styles.courseButton} onClick={openBibliography} type="button">
                            <img src={Bibliography} alt="bibliography" />
                            <span>{t("active.course.hub.bibliography.button", "Bibliografia")}</span>
                        </button>
                    )}
                </div>

                {titleText && (
                    <div className={styles.titleRow}>
                        <h1 className={styles.courseTitle}>{titleText}</h1>
                    </div>
                )}
            </div>
        </PrimaryContainer>
    );
};

export default CourseHeader;
