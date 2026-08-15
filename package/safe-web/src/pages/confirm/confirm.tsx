import React, { useState, useEffect, type MouseEvent, type ChangeEvent } from "react";
import { useTranslate } from "@tolgee/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PageContainer from "../../page-components/page-container/page-container";
import PrimaryContainer from "../../components/primary-container/primary-container";
import PrimaryButton, { type TButtonType } from "../../components/primary-button/primary-button";
import Spinner from "../../components/spinner/spinner.component";
import TextInput from "../../components/text-input/text-input";

import { useDeviceType } from "../../helpers/responsiveContainers";
import { checkEmailStart, verifyCodeStart, userEerrorClear } from "../../redux/user/user.actions";
import {
    selectIsLoadingData,
    selectLoginEmail,
    selectUserError,
} from "../../redux/user/user.selectors";

import { ERRORS_ENUM, ERRORS_TRANSLATIONS_MAP } from "../../api/user.api";

import commonStyles from "../../styles/common.module.scss";
import containerStyles from "../../styles/containers.module.scss";
import footerStyles from "../../components/footer/footer.module.scss";
import styles from "../sign-in/sign-in.module.scss";

import CodeImg from "../../assets/login/code1.svg";
import { constantsUrls } from "../../helpers/constants";
import { secondsToMinutes } from "../../helpers/shared.functions";
import { formatNewLines } from "../../translations/utils";


const Confirm: React.FC = () => {
    const { t } = useTranslate();
    const navigate = useNavigate();
    const { isMobile } = useDeviceType();
    const dispatch = useDispatch();
    const loginEmail = useSelector(selectLoginEmail);
    const loginError = useSelector(selectUserError);
    const isLoadingData = useSelector(selectIsLoadingData);
    const buttonstype: TButtonType = isMobile ? "default" : "action";
    const [verificationCode, setVerificationCode] = useState("");
    const [loginStarted, setLoginStarted] = useState(false);
    const [nextResendCodeInSeconds, setNextResendCodeInSeconds] = useState(0);

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

    useEffect(() => {
        if (nextResendCodeInSeconds > 0) {
            setTimeout(() => setNextResendCodeInSeconds(nextResendCodeInSeconds - 1), 1000);
        }
    }, [nextResendCodeInSeconds, setNextResendCodeInSeconds]);

    const handleSubmit = async (event?: MouseEvent | React.KeyboardEvent) => {
        event?.preventDefault();
        setLoginStarted(true);
        dispatch(verifyCodeStart({email: loginEmail, verificationCode}));
    };

    const handleInputCode = (event?: ChangeEvent<HTMLInputElement>) => {
        event?.preventDefault();
        const value = event?.target.value ?? "";
        if (value.length < 7) {
            setVerificationCode(value);
            if (loginError) dispatch(userEerrorClear());
        }
    }

    const sendCodeAgain = () => {
        if (nextResendCodeInSeconds === 0) {
            dispatch(checkEmailStart(loginEmail));
            setNextResendCodeInSeconds(120);
        }
    }

    return (
        <PageContainer>
            <PrimaryContainer direction="column">
                <img
                    src={CodeImg}
                    alt="Login confirm"
                    className={styles.img}
                />
                <p
                    className={`${commonStyles.basicHeader4}`}
                >
                    {t("signin.confirm.header.enter-code")}
                </p>
                <p className={`${commonStyles.basicParagraph1} ${commonStyles.centeredText}`}>{formatNewLines(t("signin.confirm.code-description"))}</p>
                <PrimaryContainer
                    direction="column"
                    additionalClassess={containerStyles.buttonsContainer}
                >
                    <TextInput
                        name="verificationCode"
                        onChange={handleInputCode}
                        onKeyDown={(e) => {
                            if (e?.key === "Enter") {
                                handleSubmit(e);
                            }
                        }}
                        placeholder={t("signin.confirm.input-placeholder")}
                        type="text"
                        value={verificationCode}
                        error={loginError === ERRORS_ENUM.INCORRECT_VERIFICATION_CODE}
                    />
                    <p
                        className={`${commonStyles.blueText} ${footerStyles.privacyRef} ${commonStyles.noPadding} ${commonStyles.noMargin} ${commonStyles.centeredText}${nextResendCodeInSeconds > 0 ? ` ${commonStyles.nonClickableCursor}` : ''}`}
                        onClick={sendCodeAgain}
                    >
                        {t("signin.confirm.send-code-again")}
                        {nextResendCodeInSeconds > 0 && ` - ${secondsToMinutes(nextResendCodeInSeconds)}`}
                    </p>
                    {isLoadingData && <Spinner />}
                </PrimaryContainer>
                <div className={styles.errorDescriptionContainer}>
                    <p className={commonStyles.redText}>
                        {loginError && <p>{t(ERRORS_TRANSLATIONS_MAP?.[loginError] ?? loginError)}</p>}
                    </p>

                </div>
            </PrimaryContainer>
            <PrimaryContainer
                direction={isMobile ? "column" : "row"}
                additionalClassess={isMobile 
                    ? `${containerStyles.buttonsContainer} ${commonStyles.bottom} ${styles.bottomButtons}`
                    : styles.bottomButtons
                }
            >
                <PrimaryButton color="violet" onClick={handleSubmit} type={buttonstype}>
                    {t("main.confirm")}
                </PrimaryButton>
                <PrimaryButton color="grey" onClick={() => navigate(constantsUrls.LandingPage.main)} type={buttonstype}>
                    {t("main.back")}
                </PrimaryButton>
            </PrimaryContainer>
        </PageContainer>
    );
};

export default Confirm;
