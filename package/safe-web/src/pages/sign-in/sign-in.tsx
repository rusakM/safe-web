import React, { useState, useEffect, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslate } from "@tolgee/react";
import { useDispatch, useSelector } from "react-redux";

import PageContainer from "../../page-components/page-container/page-container";
import PrimaryContainer from "../../components/primary-container/primary-container";
import PrimaryButton, { type TButtonType } from "../../components/primary-button/primary-button";
import TextInput from "../../components/text-input/text-input";

import { handleInputText } from "../../helpers/events.functions";
import { useDeviceType } from "../../helpers/responsiveContainers";
import { checkEmailStart } from "../../redux/user/user.actions";
import {
    selectIsLoadingData,
    selectLoginEmail,
    selectUserError,
} from "../../redux/user/user.selectors";

import { ERRORS_ENUM, ERRORS_TRANSLATIONS_MAP } from "../../api/user.api";

import commonStyles from "../../styles/common.module.scss";
import containerStyles from "../../styles/containers.module.scss";
import footerStyles from "../../components/footer/footer.module.scss";
import styles from "./sign-in.module.scss";
import Spinner from "../../components/spinner/spinner.component";

import KeysImg from "../../assets/login/login1.svg";
import { constantsUrls } from "../../helpers/constants";

const SignIn: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslate();
    const { isMobile } = useDeviceType();
    const dispatch = useDispatch();
    const loginError = useSelector(selectUserError);
    const loginEmail = useSelector(selectLoginEmail);
    const isLoadingData = useSelector(selectIsLoadingData);
    const buttonstype: TButtonType = isMobile ? "default" : "action";
    const [email, setEmail] = useState("");
    const [loginStarted, setLoginStarted] = useState(false);

    useEffect(() => {
        if (
            loginError === ERRORS_ENUM.USER_WITH_EMAIL_NOT_FOUND &&
            loginStarted
        ) {
            navigate(constantsUrls.LandingPage.signUp);
        } else if (!loginError && loginStarted && loginEmail) {
            navigate(constantsUrls.LandingPage.confirm);
        }
    }, [navigate, loginError, loginStarted, loginEmail]);

    const handleSubmit = (event?: MouseEvent | React.KeyboardEvent) => {
        event?.preventDefault();
        if (!email) return;
        setLoginStarted(true);
        dispatch(checkEmailStart(email));
    };

    return (
        <PageContainer>
            <PrimaryContainer direction="column">
                <img
                    src={KeysImg}
                    alt="Sign in"
                    className={styles.img}
                />
                <p
                    className={`${commonStyles.basicHeader4}`}
                >
                    {t("main.signin")}
                </p>
                <PrimaryContainer
                    direction="column"
                    additionalClassess={containerStyles.buttonsContainer}
                >
                    <TextInput
                        name="email"
                        onChange={handleInputText(setEmail)}
                        onKeyDown={(e) => {
                            if (e?.key === "Enter") {
                                handleSubmit(e);
                            }
                        }}
                        placeholder="E-mail"
                        type="email"
                        value={email}
                    />
                    <p
                        className={`${commonStyles.blueText} ${footerStyles.privacyRef} ${commonStyles.noPadding} ${commonStyles.noMargin} ${commonStyles.centeredText}`}
                        onClick={() => navigate(constantsUrls.LandingPage.signUp)}
                    >
                        {t("main.register-question")}
                    </p>
                    {isLoadingData && <Spinner />}
                    {loginError && <p>{t(ERRORS_TRANSLATIONS_MAP?.[loginError] ?? loginError)}</p>}
                </PrimaryContainer>
            </PrimaryContainer>
            <PrimaryContainer
                direction={isMobile ? "column" : "row"}
                additionalClassess={isMobile 
                    ? `${containerStyles.buttonsContainer} ${commonStyles.bottom} ${styles.bottomButtons}`
                    : styles.bottomButtons
                }
            >
                <PrimaryButton color="violet" onClick={handleSubmit} type={buttonstype}>
                    {t("main.signin")}
                </PrimaryButton>
                <PrimaryButton color="grey" onClick={() => navigate(constantsUrls.LandingPage.main)} type={buttonstype}>
                    {t("main.back")}
                </PrimaryButton>
            </PrimaryContainer>
        </PageContainer>
    );
};

export default SignIn;
