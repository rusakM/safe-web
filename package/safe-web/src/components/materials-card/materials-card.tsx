import React from 'react';
import { useTranslate } from '@tolgee/react';
import Card from '../card/card';
import PrimaryButton from '../primary-button/primary-button';

import styles from "./materials-card.module.scss";
import cardStyles from "../card/card.module.scss";
import ResizeIconImg from "../../assets/icons/resize.svg";
import DownloadIconImg from "../../assets/icons/download.svg";
import DocumentIcon from "../../assets/icons/document_icon.svg";

export interface IMaterialsCard {
    description?: string;
    downloadAction?: () => void;
    header?: string;
    picture?: string;
    resizeAction?: () => void;
}

const MaterialsCard: React.FC<IMaterialsCard> = ({ description, downloadAction, header, picture, resizeAction }) => {
    const { t } = useTranslate();
    return (
        <div className={styles.cardContainer}>
            <Card>
                <img src={picture || DocumentIcon} alt="card" className={`${!picture ? styles.defaultCardImage : ''}`} />
                <p className={`${cardStyles.cardHeader}`}>
                    {header || ""}
                </p>
                <p className={`${cardStyles.cardDescription}`}>
                    {description || ""}
                </p>
            </Card>

            <div className={`${styles.cardButtonsContainer}`}>
                <PrimaryButton color="violet" rounded={true} icon={true} animated={true} gradient={true} onClick={downloadAction} title={t("manuals.placeholder.download")}>
                    <img src={DownloadIconImg} />
                </PrimaryButton>
                <PrimaryButton color="violet" rounded={true} icon={true} animated={true} gradient={true} onClick={resizeAction} title={t("manuals.placeholder.open")}>
                    <img src={ResizeIconImg} />
                </PrimaryButton>
            </div>
        </div>
    );
};

export default MaterialsCard;