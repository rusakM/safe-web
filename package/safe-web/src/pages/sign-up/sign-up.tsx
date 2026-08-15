import React, { useState, useEffect, type ChangeEvent, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslate } from "@tolgee/react";

import Checkbox from "../../components/checkbox/checkbox";
import PageContainer from "../../page-components/page-container/page-container";
import PrimaryContainer from "../../components/primary-container/primary-container";
import PrimaryButton, { type TButtonType } from "../../components/primary-button/primary-button";
import TextInput from "../../components/text-input/text-input";
import Spinner from "../../components/spinner/spinner.component";

import { downloadFile, handleInputText } from "../../helpers/events.functions";
import { useDeviceType } from "../../helpers/responsiveContainers";
import { checkEmailStart, signUpStart } from "../../redux/user/user.actions";

import {
    selectIsLoadingData,
    selectLoginEmail,
    selectUserError,
} from "../../redux/user/user.selectors";

import { ERRORS_ENUM } from "../../api/user.api";

import commonStyles from "../../styles/common.module.scss";
import containerStyles from "../../styles/containers.module.scss";
import footerStyles from "../../components/footer/footer.module.scss";
import styles from "../sign-in/sign-in.module.scss";
import internalStyles from "./sign-up.module.scss";

import KeysImg from "../../assets/login/login1.svg";
import { constantsUrls } from "../../helpers/constants";
import { UserValidators } from "../../helpers/validators.ts/user";
import { getCurrentLocale } from "../../translations/utils";
import { useDispatch, useSelector } from "react-redux";

const SignUp: React.FC = () => {
    const { t } = useTranslate();
    const { isMobile } = useDeviceType();
    const dispatch = useDispatch();
    const buttonsType: TButtonType = isMobile ? "default" : "action";
    const navigate = useNavigate();
    const loginEmail = useSelector(selectLoginEmail);
    const loginError = useSelector(selectUserError);
    const isLoadingData = useSelector(selectIsLoadingData);

    const [email, setEmail] = useState(loginEmail || "");
    const [confirm, setConfirm] = useState(false);
    const [formError, setFormError] = useState({
        confirm: false,
        email: false,
    });
    const [loginStarted, setLoginStarted] = useState(false);

    useEffect(() => {
        if (
            loginError === ERRORS_ENUM.USER_EMAIL_EXIST &&
            loginStarted
        ) {
            dispatch(checkEmailStart(email));
        } else if (!loginError && loginStarted && loginEmail) {
            navigate(constantsUrls.LandingPage.confirm);
        }
    }, [navigate, loginError, loginStarted, loginEmail, email, dispatch]);

    const handleSubmit = async (event?: MouseEvent<HTMLButtonElement>) => {
        event?.preventDefault();

        const validateError = !!(UserValidators.email.validate(email)?.error) || null;
        if (!email || !confirm || validateError) {
            setFormError({
                confirm: !confirm,
                email: validateError ? true : !email
            });
            return;
        }
        setLoginStarted(true);
        dispatch(signUpStart({ email, userInterfaceLanguage: getCurrentLocale() }));
    };

    const handleChange = (event?: ChangeEvent<Element, Element>) => {
        setConfirm((event as ChangeEvent<HTMLInputElement>)?.target?.checked);
        setFormError({
            ...formError,
            confirm: false
        });
    }

    return (
        <PageContainer>
            <PrimaryContainer direction="column">
                <img
                    src={KeysImg}
                    alt="Sign up"
                    className={styles.img}
                />
                <p
                    className={`${commonStyles.basicHeader4}`}
                >
                    {t("main.signup")}
                </p>
                <PrimaryContainer
                    direction="column"
                    additionalClassess={containerStyles.buttonsContainer}
                >
                    <TextInput
                        name="email"
                        onChange={handleInputText(setEmail, () => setFormError({ ...formError, email: false }))}
                        placeholder="E-mail"
                        type="email"
                        value={email}
                        error={formError.email}
                    />
                    <p
                        className={`${commonStyles.blueText} ${footerStyles.privacyRef} ${commonStyles.noPadding} ${commonStyles.noMargin} ${commonStyles.centeredText}`}
                        onClick={() => navigate(constantsUrls.LandingPage.signIn)}
                    >
                        {t("main.login-question")}
                    </p>
                    <Checkbox 
                        checked={confirm}
                        error={formError.confirm}
                        label={<>
                            {t("signup.confirm-regulations")} <span 
                                className={commonStyles.blueText} 
                                title={t("main.regulations")} 
                                onClick={() => downloadFile(constantsUrls.Footer.conditionTerms)}
                            >
                                {t("main.regulations")}
                            </span> {t("main.and")} <span 
                                className={commonStyles.blueText} 
                                title={t("main.privacy-policy")} 
                                onClick={() => downloadFile(constantsUrls.Footer.privacyPolicy)}
                            >
                                {t("main.privacy-policy")}
                            </span>.</>}
                        onChange={handleChange}
                        additionalClasses={`${internalStyles.checkbox} ${commonStyles.centerFlex}`}
                    />
                </PrimaryContainer>
                { isLoadingData && <Spinner /> }
            </PrimaryContainer>
            <PrimaryContainer
                direction={isMobile ? "column" : "row"}
                additionalClassess={isMobile 
                    ? `${containerStyles.buttonsContainer} ${commonStyles.bottom} ${styles.bottomButtons}`
                    : styles.bottomButtons
                }
            >
                <PrimaryButton color="violet" onClick={handleSubmit} type={buttonsType}>
                    {t("main.signup")}
                </PrimaryButton>
                <PrimaryButton color="grey" onClick={() => navigate(constantsUrls.LandingPage.main)} type={buttonsType}>
                    {t("main.back")}
                </PrimaryButton>
            </PrimaryContainer>
        </PageContainer>
    );
};

export default SignUp;
