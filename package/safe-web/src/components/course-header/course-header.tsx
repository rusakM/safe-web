import React from "react";
import { useTranslate } from "@tolgee/react";
import PrimaryContainer from "../primary-container/primary-container";

import styles from "./course-header.module.scss";

import ArrowNext from "../../assets/icons/game_arrow_next.svg";
import ArrowBack from "../../assets/icons/game_arrow_back.svg";
import Bibliography from "../../assets/icons/bibliography.svg";

interface ICourseHeader {
    goBack?: () => void;
    goNext?: () => void;
    module: number;
    openBibliography?: () => void;
    section: number;
    showBibliography?: boolean;
}

const CourseHeader: React.FC<ICourseHeader> = ({ showBibliography = false, section, module, goBack, goNext, openBibliography }) => {
    const { t } = useTranslate();
    const moduleDescription = module > 0 ? t(`active.course.navigation.module.${module}`) + ", " + t(`active.course.navigation.section.${section}`) : ""; 
    return (
        <PrimaryContainer direction="column" additionalClassess={styles.courseHeaderOutline}>
            <PrimaryContainer direction="column" additionalClassess={styles.courseHeaderContainer}>
                <PrimaryContainer direction="row" additionalClassess={styles.controlsRow}>
                    <span className={styles.courseButton}>
                        <img src={ArrowBack} alt="back" onClick={goBack} />
                        {moduleDescription}
                    </span>
                    
                        {!showBibliography ? (
                            <span className={styles.courseButton}>
                                {t(`active.course.hub.next.page.button`)}
                                <img src={ArrowNext} alt="next" onClick={goNext} />
                                </span>
                        ) : (
                            <span className={styles.courseButton}>
                                <img src={Bibliography} alt="bibliography" onClick={openBibliography} />
                                {t(`active.course.hub.bibliography.button`)}
                                </span>
                        )}
                </PrimaryContainer>
                <PrimaryContainer direction="row">
                    {module > 0 && (
                        <span className={styles.courseTitle}>
                            {t(`active.course.hub.module.title.${module}`)}
                        </span>
                    )}
                </PrimaryContainer>
            </PrimaryContainer>
        </PrimaryContainer>
    );
};

export default CourseHeader;    