import React, { useState, type MouseEvent, type ChangeEvent } from "react";
import { getName, getCodes } from "country-list";
import { useNavigate } from "react-router-dom";
import { useTranslate } from "@tolgee/react";
import { useDispatch, useSelector } from "react-redux";

import PageContainer from "../../page-components/page-container/page-container";
import PrimaryContainer from "../../components/primary-container/primary-container";
import PrimaryButton, { type TButtonType } from "../../components/primary-button/primary-button";
import SelectInput, { type ISelectInputOption } from "../../components/select-input/select-input";
import TextInput from "../../components/text-input/text-input";
import Spinner from "../../components/spinner/spinner.component";

import { useDeviceType } from "../../helpers/responsiveContainers";
import { validateEditUser } from "../../helpers/validators.ts/user";
import { userEditStart } from "../../redux/user/user.actions";
import {
    selectIsLoadingData,
    selectUserError,
} from "../../redux/user/user.selectors";
import type { IUserEdit } from "../../types/user";

import styles from "./fill-register-data.module.scss";
import commonStyles from "../../styles/common.module.scss";
import containerStyles from "../../styles/containers.module.scss";
import signInStyles from "../sign-in/sign-in.module.scss";

import KeysImg from "../../assets/login/login1.svg";
import { constantsUrls } from "../../helpers/constants";
import { getCurrentLocale } from "../../translations/utils";


const FillRegisterData: React.FC = () => {
    const { t } = useTranslate();
    const navigate = useNavigate();
    const { isMobile } = useDeviceType();
    const dispatch = useDispatch();
    const isLoadingData = useSelector(selectIsLoadingData);
    const signUpError = useSelector(selectUserError);
    const buttonstype: TButtonType = isMobile ? "default" : "action";

    const countriesList: ISelectInputOption[] = getCodes().map(code => ({
        label: getName(code) ?? "" as string,
        value: code
    } as ISelectInputOption)).sort((a, b) => (getName(a.value) as string).localeCompare((getName(b.value)) as string))

    const [ registerForm, setRegisterForm ] = useState<IUserEdit>({
        cookiesAgreement: localStorage.getItem("cookiesAccepted") === "true",
        countryCode: "",
        firstName: "",
        lastName: "",
        rodoAgreement: true,
        userInterfaceLanguage: getCurrentLocale() || "en"
    })

    const [validateRegisterForm, setValidateRegisterForm] = useState({
        countryCode: false,
        firstName: false,
        lastName: false,
        role: false,
    });

    const handleSubmit = (event?: MouseEvent) => {
        event?.preventDefault();
        setValidateRegisterForm(validateEditUser(registerForm));
        for (const validation of Object.values(validateRegisterForm)) {
            if (validation) return;
        }
        dispatch(userEditStart(registerForm))
    };

    const handleInputText = (key: keyof typeof registerForm) => {
        return (event?: ChangeEvent<Element, Element>) => {
            event?.preventDefault();
            setRegisterForm({
                ...registerForm,
                [key]: (event as ChangeEvent<HTMLInputElement>)?.target?.value ?? ""
            });
            setValidateRegisterForm({
                ...validateRegisterForm,
                [key]: false
            });
        }
    }

    return (
        <PageContainer>
            <PrimaryContainer direction="column" additionalClassess={styles.container}>
                <img
                    src={KeysImg}
                    alt="Sign in"
                    className={signInStyles.img}
                />
                <p
                    className={`${commonStyles.basicHeader4}`}
                >
                    {t("sign-up.fill-register-data")}
                </p>
                    <PrimaryContainer
                    direction="column"
                    additionalClassess={`${commonStyles.padding1em} ${containerStyles.buttonsContainer} ${styles.controlsContainer}`}
                    >
                        <PrimaryContainer direction="row" additionalClassess={''}>
                            <div className={`${containerStyles.halfScreenContainer} ${styles.paddingInputRight}`}>
                                <TextInput 
                                    name="firstName"
                                    onChange={handleInputText('firstName')}
                                    value={registerForm.firstName}
                                    placeholder={t("sign-up.register-form.first-name")}
                                    error={validateRegisterForm.firstName}
                                />
                            </div>
                            <div className={`${containerStyles.halfScreenContainer} ${styles.paddingInputLeft}`}>
                                <TextInput
                                    name="lastName"
                                    onChange={handleInputText('lastName')}
                                    placeholder={t("sign-up.register-form.last-name")}
                                    value={registerForm.lastName}
                                    error={validateRegisterForm.lastName}
                                />
                            </div>
                        </PrimaryContainer>
                        <SelectInput 
                            name="countryCode"
                            value={registerForm.countryCode}
                            onChange={(countryCode: string) => {
                                setRegisterForm({
                                    ...registerForm,
                                    countryCode
                                })
                            }}
                            options={countriesList}
                            placeholder={t("sign-up.register-form.country")}
                            error={validateRegisterForm.countryCode}
                        />
                        {isLoadingData && <Spinner />}
                        {signUpError && <p>{signUpError}</p>}
                    </PrimaryContainer>
                    <div className={isMobile ? containerStyles.bottomButtonsContainer : `${commonStyles.row} ${commonStyles.centerFlex} ${containerStyles.basicGap} ${containerStyles.buttonsContainer}`}>
                        <PrimaryButton color="violet" onClick={handleSubmit} type={buttonstype}>
                            {t("main.confirm")}
                        </PrimaryButton>
                        <PrimaryButton color="white" onClick={() => navigate(constantsUrls.LandingPage.main)} type={buttonstype}>
                            {t("main.back")}
                        </PrimaryButton>
                    </div>
            </PrimaryContainer>
        </PageContainer>
    );
};

export default FillRegisterData;
