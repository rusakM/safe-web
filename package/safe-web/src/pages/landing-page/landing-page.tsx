import React, { useState } from "react";
import { useTranslate } from "@tolgee/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import PageContainer from "../../page-components/page-container/page-container";
import PrimaryContainer from "../../components/primary-container/primary-container";
import PrimaryButton from "../../components/primary-button/primary-button";

import { useDeviceType } from "../../helpers/responsiveContainers";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { constantsUrls } from "../../helpers/constants";

import styles from "./landing-page.module.scss";
import commonStyles from "../../styles/common.module.scss";

import LandingPageCarousel from "../../components/landing-page-carousel/landing-page-carousel";
import CardText from "../../components/card-text/card-text";
import Footer from "../../components/footer/footer";

import img1 from "../../assets/landing-page/hero_img1.svg";
import img2 from "../../assets/landing-page/teacher_books1.svg";
import blogDesktop from "../../assets/landing-page/blog_pc1.svg";
import blogMobile from "../../assets/landing-page/blog_mobile1.svg";
//instruction
import instruction1 from "../../assets/landing-page/step21.svg";
import instruction2 from "../../assets/landing-page/step31.svg";
import instruction3 from "../../assets/landing-page/step41.svg";
import instruction4 from "../../assets/landing-page/step51.svg";

// partners
import Mdu from "../../assets/partners/MDU.svg";
import Spin from "../../assets/partners/spin.png";
import Eurolider from "../../assets/partners/eurolider.svg";
import Nova from "../../assets/partners/nova.png";
import SB from "../../assets/partners/sydic.png";
import Smarts from "../../assets/partners/SMARTS.png";
import Preparemeai from "../../assets/partners/preparemeai.svg";
import UM from "../../assets/partners/UM.png";

const InstructionSlides = [
    instruction1,
    instruction2,
    instruction3,
    instruction4
];

const partners = [
    { src: Mdu, alt: "Mälardalen University", url: constantsUrls.Partners.mdu },
    { src: Spin, alt: "Spin System", url: constantsUrls.Partners.spin },
    { src: Eurolider, alt: "EuroLider", url: constantsUrls.Partners.eurolider },
    { src: Nova, alt: "NOVA Universidade Nova de Lisboa", url: constantsUrls.Partners.nova },
    { src: SB, alt: "SB", url: constantsUrls.Partners.sydic },
    { src: Smarts, alt: "Smarts", url: constantsUrls.Partners.smarts },
    { src: Preparemeai, alt: "prepare me.ai", url: constantsUrls.Partners.preparemeai },
    { src: UM, alt: "University of Maribor", url: constantsUrls.Partners.um },
];

const LandingPage: React.FC = () => {
    const { isMobile } = useDeviceType();
    const { t } = useTranslate();
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);
    const [instructionSlide, setInstructionSlide] = useState<number>(0);
    return (
        <PageContainer>
            {/* first */}
            <PrimaryContainer additionalClassess={styles.first} direction={isMobile ? "column" : "row"}>
                <PrimaryContainer direction={ isMobile ? "columnReverse" : "row"} contentAlignment={isMobile ? "right" : "left"} width="desktopFit" additionalClassess={`${commonStyles.heightFull}`}>
                    <PrimaryContainer direction="column" contentAlignment="left" contentJustify="left" additionalClassess={styles.halfScreenDesktop}>
                        <p className={commonStyles.basicHeader}>{t("landing-page.header1")}</p>
                        {
                            !currentUser && <PrimaryButton color="violet" gradient={true} increaseHorizontalPadding={true} additionalClasses={styles.loginBtn} animated={true} onClick={() => navigate(constantsUrls.LandingPage.signIn)}>{t("landing-page.buttons.login")}</PrimaryButton>
                        }
                    </PrimaryContainer>
                        <img src={img1} alt="main page" className={`${styles.halfScreenDesktop} ${styles.landingPageImg}`}/>
                    
                </PrimaryContainer>
            </PrimaryContainer>
            {/* second */}
            <PrimaryContainer direction="column" height="allScreenHeight">
                <LandingPageCarousel />
            </PrimaryContainer>
            {/* third */}
            <PrimaryContainer direction="column" additionalClassess={styles.third} >
                <PrimaryContainer direction={isMobile ? "column" : "row"} width="desktopFit" height={isMobile ? "auto" : "allScreenHeight"}>
                    <PrimaryContainer direction="column" additionalClassess={`${!isMobile ? styles.halfScreenDesktop : ''}`}>
                        <img src={InstructionSlides[instructionSlide]} alt="instruction" className={`${styles.landingPageImg}`} />
                    </PrimaryContainer>
                    <PrimaryContainer direction="column" additionalClassess={`${styles.instructionTextContainer}${!isMobile ? ` ${styles.halfScreenDesktop}` : ''}`} contentJustify="left" contentAlignment={isMobile ? "left" : "center"} height={isMobile ? "auto" : "allScreenHeight"}>
                        <p className={`${commonStyles.basicHeader2} ${commonStyles.leftSideText} ${commonStyles.noHorizontalPadding}`}>{t("landing-page.header3")}</p>
                        <p className={`${styles.basicText} ${styles.instructionText}`}>{t(`landing-page.instruction${instructionSlide + 1}`)}</p>
                        <div className={styles.instructionButtonsContainer}>
                            <PrimaryButton color="white" gradient={true} rounded={true} additionalClasses={`${styles.instructionBtn}${instructionSlide === 0 ? ` ${styles.instructionBtnActive}` : ""}`} onClick={() => setInstructionSlide(0)}>{""}</PrimaryButton>
                            <PrimaryButton color="white" gradient={true} rounded={true} additionalClasses={`${styles.instructionBtn}${instructionSlide === 1 ? ` ${styles.instructionBtnActive}` : ""}`} onClick={() => setInstructionSlide(1)}>{""}</PrimaryButton>
                            <PrimaryButton color="white" gradient={true} rounded={true} additionalClasses={`${styles.instructionBtn}${instructionSlide === 2 ? ` ${styles.instructionBtnActive}` : ""}`} onClick={() => setInstructionSlide(2)}>{""}</PrimaryButton>
                            <PrimaryButton color="white" gradient={true} rounded={true} additionalClasses={`${styles.instructionBtn}${instructionSlide === 3 ? ` ${styles.instructionBtnActive}` : ""}`} onClick={() => setInstructionSlide(3)}>{""}</PrimaryButton>
                        </div>
                    </PrimaryContainer>
                </PrimaryContainer>
            </PrimaryContainer>
            {/* fourth */}
            <PrimaryContainer direction="column">
                <PrimaryContainer direction="column" additionalClassess={styles.fourth} width="desktopFit">
                    <PrimaryContainer direction={isMobile ? "column" : "row"}>
                        <PrimaryContainer direction="column" additionalClassess={`${commonStyles.smallVerticalPadding}${!isMobile ? ` ${styles.halfScreenDesktop}` : ''}`}>
                            <p className={`${commonStyles.basicHeader2} ${commonStyles.leftSideText} ${commonStyles.noHorizontalPadding} ${commonStyles.width100}`}>{t("landing-page.header4")}</p>
                            <img src={img2} alt="teacher's guides" className={`${styles.landingPageImg}`} />
                        </PrimaryContainer>
                        <PrimaryContainer direction="column" additionalClassess={`${!isMobile ? styles.halfScreenDesktop : ''} ${styles.textCardsContainer}`} contentJustify={isMobile ? "center" : "right"}>
                            <PrimaryButton color="grey" animated={true} gradient={true}>{t("landing-page.buttons.teachers-guides")}</PrimaryButton>
                            <CardText text={t("landing-page.teachers-guides.text1")} />
                            <CardText text={t("landing-page.teachers-guides.text2")} />
                            <CardText text={t("landing-page.teachers-guides.text3")} />
                        </PrimaryContainer>
                    </PrimaryContainer>
                    <PrimaryContainer direction={isMobile ? "column" : "rowReverse"}>
                        <PrimaryContainer direction="column" additionalClassess={`${commonStyles.smallVerticalPadding}${!isMobile ? ` ${styles.halfScreenDesktop}` : ''}`}>
                            <p className={`${commonStyles.basicHeader2} ${commonStyles.leftSideText} ${commonStyles.noHorizontalPadding} ${commonStyles.width100}`}>{t("landing-page.header5")}</p>
                            <img src={img2} alt="simulator environment" className={`${styles.landingPageImg}`} />
                        </PrimaryContainer>
                        <PrimaryContainer direction="column" additionalClassess={`${!isMobile ? styles.halfScreenDesktop : ''} ${styles.textCardsContainer}`} contentJustify={isMobile ? "center" : "left"}>
                            <PrimaryButton color="grey" animated={true} gradient={true}>{t("landing-page.buttons.simulation")}</PrimaryButton>
                            <CardText text={t("landing-page.simulation.text1")} />
                            <CardText text={t("landing-page.simulation.text2")} />
                        </PrimaryContainer>
                    </PrimaryContainer>
                </PrimaryContainer>
            </PrimaryContainer>
           
            {/* fifth */}
            <PrimaryContainer direction="column" additionalClassess={styles.fifth}>
                <PrimaryContainer direction="column" width="desktopFit">
                    <PrimaryContainer direction="column" additionalClassess={`${commonStyles.padding1em} ${styles.blogHeaderContainer}`}>
                        <p className={`${commonStyles.basicHeader3} ${commonStyles.noHorizontalPadding} ${styles.blogHeader}`}>{t("landing-page.header6")}</p>
                        <PrimaryButton color="violet" animated={true} size="regular" gradient={true} increaseHorizontalPadding={true}>
                            {t("landing-page.blog-btn")}
                        </PrimaryButton>
                    </PrimaryContainer>
                    <img src={isMobile ? blogMobile : blogDesktop} alt="blog" className={`${styles.landingPageImg} ${styles.blogImg}`} />
                </PrimaryContainer>
            </PrimaryContainer>
            {/* sixth */}
            <PrimaryContainer>
                <PrimaryContainer width="desktopFit" height="allScreenHeight" contentAlignment="center">
                    <p className={`${commonStyles.basicHeader2} ${commonStyles.leftSideText} ${commonStyles.noHorizontalPadding}`}>{t("landing-page.header7")}</p>
                    <div className={styles.partnersGrid} >
                        {partners.map((logo) => (
                            <div key={logo.alt} className={styles.partnersItem}>
                                <a href={logo.url} target="_blank" rel="noopener noreferrer">
                                    <img src={logo.src} alt={logo.alt} className={styles.partnersImg} />
                                </a>
                            </div>
                        ))}
                    </div>
                </PrimaryContainer>
            </PrimaryContainer>
            <Footer />
        </PageContainer>
    )
}

export default LandingPage;