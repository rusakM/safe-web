import React from 'react';
import { useTranslate } from '@tolgee/react';
import PrimaryButton from '../primary-button/primary-button';
import { useDeviceType } from '../../helpers/responsiveContainers';

import styles from "./course-card.module.scss";
import cardStyles from "../card/card.module.scss";
import commonStyles from "../../styles/common.module.scss";
import PrimaryContainer from '../primary-container/primary-container';

export type TCourseStatus = "not-started" | "pending" | "completed";

export interface ICourseCard {
    description?: string;
    header?: string;
    picture?: string;
    start?: () => void;
    status?: TCourseStatus;
}

const CourseCard: React.FC<ICourseCard> = ({ description, header, picture, start, status = "not-started" }) => {
    const { t } = useTranslate();
    const { isMobile } = useDeviceType();
    return (
        <div className={styles.cardContainer}>
            <div className={styles.card}>
                <div className={styles.cardImageContainer} >
                    <img src={picture} alt="course" />
                </div>
                <PrimaryContainer direction="column" contentAlignment="left" additionalClassess={`${styles.cardInfoContainer} ${commonStyles.padding1em}`}>
                    { 
                        !isMobile ?
                        <PrimaryContainer contentAlignment="right" additionalClassess={`${commonStyles.padding1em}`}>
                            <p>{t(`course.status.${status}`)}</p>
                        </PrimaryContainer>
                        : <PrimaryButton color="white" additionalClasses={styles.badge} rounded={true}>{t(`course.status.${status}`)}</PrimaryButton>
                    }
                    <PrimaryContainer contentAlignment="left">
                        <p className={`${cardStyles.cardHeader}`}>
                            {header || ""}
                        </p>
                        <p className={`${cardStyles.cardDescription} ${styles.description}`}>
                            {description || ""}
                        </p>
                    </PrimaryContainer>
                    <PrimaryContainer contentAlignment={isMobile ? "center" : "left"}>
                        <PrimaryButton color="violet" onClick={start} additionalClasses={`${styles.button}`}>{t("course.buttons.start")}</PrimaryButton>
                    </PrimaryContainer>
                </PrimaryContainer>
            </div>
        </div>
    );
};

export default CourseCard;