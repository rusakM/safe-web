import React, { useState } from 'react';
import { useTranslate } from '@tolgee/react';

import PrimaryContainer from '../primary-container/primary-container';
import PrimaryButton from '../primary-button/primary-button';

import { useDeviceType } from '../../helpers/responsiveContainers';

import styles from './landing-page-carousel.module.scss';
import cardStyles from '../card/card.module.scss';
import commonStyles from '../../styles/common.module.scss';

import FakeNews from '../../assets/courses/fake_news.svg';
import Cyberbullying from '../../assets/courses/cyberbullying.svg';
import InternetScam from '../../assets/courses/internet_scam.svg';
import OnlineThreats1 from '../../assets/courses/online_threats1.svg';
import OnlineThreats2 from '../../assets/courses/online_threats2.svg';
import WebSecurely from '../../assets/courses/web_securely.svg';
import HistoryCybersecurity from '../../assets/courses/history_cybersecurity.svg';
import Card from '../card/card';

import ArrowLeft from '../../assets/icons/arrow-left.svg';
import ArrowRight from '../../assets/icons/arrow-right.svg';

const coursesList: [name: string, photo: string][] = [
    ['fake-news', FakeNews],
    ['cyberbullying', Cyberbullying],
    ['internet-scam', InternetScam],
    ['online-threats1', OnlineThreats1],
    ['online-threats2', OnlineThreats2],
    ['web-securely', WebSecurely],
    ['history-cybersecurity', HistoryCybersecurity]
];

const LandingPageCarousel: React.FC = () => {
    const { t } = useTranslate();
    const { isMobile } = useDeviceType();
    const maxItemsVisible = isMobile ? 1 : 3;
    const [list, setList] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);

    const swipe = (next: boolean = false): void => {
        const tempArr = [...list];
        if (next) {
            const first = tempArr.shift()!;
            tempArr.push(first);
        } else {
            const last = tempArr.pop()!;
            tempArr.unshift(last);
        }
        setList(tempArr);
    } 

    return (
        <PrimaryContainer direction='column' width='desktopFit'>
            <div style={{ width: '100%' }}>
                <p className={`${commonStyles.basicHeader2} ${styles.carouselTitle}`}>{t('landing-page.header2')}</p>
            </div>
            <div className={styles.carouserWrapper}>
                <div className={styles.carouselContainer}>
                    {
                        list.slice(0, maxItemsVisible).map((item) => (
                            <Card>
                                <img src={coursesList[item][1]} alt={`card-${item}`}/>
                                <p className={cardStyles.cardHeader}>
                                    {t(`landing-page.carousel.${coursesList[item][0]}`)}
                                </p>
                                <p className={cardStyles.cardDescription}>
                                    {t(`landing-page.carousel.${coursesList[item][0]}.description`)}
                                </p>
                            </Card>
                        ))
                    }
                </div>
                <div className={styles.carouselButtons} >
                    <PrimaryButton rounded={true} animated={true} gradient={true} color='grey' icon={true} onClick={() => swipe()}><img src={ArrowLeft} alt="<"/></PrimaryButton>
                    <PrimaryButton rounded={true} animated={true} gradient={true} color='grey' icon={true} onClick={() => swipe(true)}><img src={ArrowRight} alt=">" /></PrimaryButton>
                </div>
            </div>
        </PrimaryContainer>
    )
}

export default LandingPageCarousel;