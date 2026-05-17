import React, { type ChangeEvent, useState } from 'react';
import { useTranslate } from '@tolgee/react';
import { getName, getCodes } from "country-list";
import {  useDispatch, useSelector } from 'react-redux';

import { useDeviceType } from '../../helpers/responsiveContainers';
import type { IUserEdit } from '../../types/user';

import PageContainer from '../../page-components/page-container/page-container';
import PrimaryContainer from '../../components/primary-container/primary-container';
import PrimaryButton from '../../components/primary-button/primary-button';
import TextInput from '../../components/text-input/text-input';
import SelectInput, { type ISelectInputOption } from '../../components/select-input/select-input';
import ToggleSwitch from '../../components/toggle-switch/toggle-switch';
import Popup from '../../components/popup/popup';
import Spinner from '../../components/spinner/spinner.component';

import { userEditStart, disableUserStart } from '../../redux/user/user.actions';

import { selectCurrentUser, selectIsLoadingData } from '../../redux/user/user.selectors';
//import TeacherImg from "../../assets/user-profile/teacher_writing_on_blackboard.svg";
import DesktopImg from "../../assets/user-edit/information_page_desktop.svg";
import MobileImg from "../../assets/user-edit/information_page_mobile.svg";

import styles from "./edit-profile.module.scss";
import commonStyles from "../../styles/common.module.scss";
import containersStyles from "../../styles/containers.module.scss";
import landingPageStyles from "../landing-page/landing-page.module.scss";
import { UserValidators } from '../../helpers/validators.ts/user';
import { formatNewLines } from '../../translations/utils';

const EditProfile: React.FC = () => {
    const { t } = useTranslate();
    const { isMobile } = useDeviceType();
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const isLoading = useSelector(selectIsLoadingData);
    const [isProfileEditing, setIsProfileEditing] = useState(false);
    const [editProfileState, setEditProfileState] = useState<IUserEdit>({
        countryCode: currentUser?.countryCode || "",
        firstName: currentUser?.firstName || "",
        lastName: currentUser?.lastName || "",
    });
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [validateForm, setValidateForm] = useState({
        countryCode: true,
        firstName: true,
        lastName: true,
    });



    const countriesList: ISelectInputOption[] = getCodes().map(code => ({
            label: `${getName(code)}`,
            value: code
        })).sort((a, b) => (getName(a.value) as string).localeCompare(getName(b.value) as string))

    const handleChange = (event?: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        event?.preventDefault();
        if (!isProfileEditing) return;
        const { value, name } = (event as ChangeEvent<HTMLInputElement>).target;
        setEditProfileState({
            ...editProfileState,
            [name]: value
        });
        setValidateForm({
            ...validateForm,
            //@ts-ignore
            [name]: value !== "" && !(UserValidators?.[name]?.not(null, "")?.required()?.validate(value)?.error)
        });
    }

    const handleSelectCountry = (countryCode: string) => {
        setEditProfileState({
            ...editProfileState,
            countryCode
        });
        setValidateForm({
            ...validateForm,
            countryCode: !(UserValidators.countryCode.not(null, "").required().validate(countryCode).error)
        });
    }

    const save = () => {
        for (const validation of Object.values(validateForm)) {
            if (!validation) return;
        }
        dispatch(userEditStart(editProfileState));
        setIsProfileEditing(false);
    }

    return (
        <PageContainer>
            <PrimaryContainer width="all">
                { !isMobile && <div className={styles.violetBackground}></div> }
                <PrimaryContainer direction={isMobile ? "column" : "row"} width="desktopFit">
                    <PrimaryContainer direction="column" additionalClassess={!isMobile ? containersStyles.halfScreenContainer : ""}>
                        <img
                            src={isMobile ? MobileImg : DesktopImg}
                            alt="Edit profile"
                            className={`${landingPageStyles.landingPageImg} ${styles.img}`}
                        />
                    </PrimaryContainer>
                    <PrimaryContainer 
                        direction="column" 
                        additionalClassess={`${commonStyles.padding1em}${!isMobile ? ` ${containersStyles.halfScreenContainer}` : ''}`}
                    >
                        <PrimaryContainer direction="column" >
                            <PrimaryContainer direction="column" contentJustify="left">
                                <p className={`${commonStyles.basicHeader3} ${commonStyles.noPadding}`}>
                                    {t(!isProfileEditing ? "profil.tab.header" : "profil.tab.EditProfile")}
                                </p>
                                <PrimaryContainer direction="row">
                                    <PrimaryContainer direction="column" additionalClassess={`${styles.nameInputContainer} ${containersStyles.halfScreenContainer}`} contentJustify="left">
                                        <p className={`${styles.label}`}>
                                            {t("profil.tab.data.name")}
                                        </p>
                                        <TextInput disabled={!isProfileEditing} 
                                            name="firstName"
                                            onChange={handleChange}
                                            value={editProfileState.firstName}
                                            placeholder={t("profil.tab.data.name")}
                                            error={!validateForm.firstName}
                                        />
                                    </PrimaryContainer>
                                    <PrimaryContainer direction="column" additionalClassess={`${styles.surnameInputContainer} ${containersStyles.halfScreenContainer}`} contentJustify="left">
                                        <p className={`${styles.label}`}>
                                            {t("profil.tab.data.surname")}
                                        </p>
                                        <TextInput disabled={!isProfileEditing}
                                            name="lastName"
                                            onChange={handleChange}
                                            value={editProfileState.lastName}
                                            placeholder={t("profil.tab.data.surname")}
                                            error={!validateForm.lastName}
                                        />
                                    </PrimaryContainer>
                                </PrimaryContainer>
                                
                                <p className={`${styles.label}`}>
                                    {t("profil.tab.data.email")}
                                </p>
                                <TextInput disabled={true}
                                    name="email"
                                    value={currentUser?.email || ""}
                                    placeholder={t("profil.tab.data.email")}
                                    type="email"
                                />
                                <p className={`${styles.label}`}>
                                    {t("profil.tab.data.country")}
                                </p>
                                <SelectInput 
                                    disabled={!isProfileEditing}
                                    name="countryCode"
                                    value={editProfileState.countryCode}
                                    onChange={handleSelectCountry}
                                    options={countriesList}
                                    placeholder={t("profil.tab.data.country")}
                                    error={!validateForm.countryCode}
                                />
                                <PrimaryContainer direction="row" additionalClassess={`${containersStyles.justifySpaceBetween} ${styles.switchContainer}`}>
                                    <ToggleSwitch value={isProfileEditing} onToggle={() => setIsProfileEditing(!isProfileEditing)} label={t("profil.tab.EditProfile")} />
                                    { 
                                        isProfileEditing && 
                                        <PrimaryButton color="grey" increaseHorizontalPadding={true} gradient={true} onClick={save}>
                                            {t("profile.tab.edit.save.button")}
                                            </PrimaryButton> 
                                    }
                                </PrimaryContainer>
                            </PrimaryContainer>
                            <PrimaryContainer direction="column" additionalClassess={`${!isMobile ? `${styles.deleteSection}` : ''}`}>
                                <PrimaryButton color="red" increaseHorizontalPadding={true} onClick={() => setIsPopupVisible(true)}>
                                    {t("profile.tab.RemoveAccount.button")}
                                </PrimaryButton>
                            </PrimaryContainer>
                        </PrimaryContainer>
                        
                    </PrimaryContainer>
                </PrimaryContainer>
                { isLoading && <Spinner /> }
                <Popup visible={isPopupVisible}>
                    <PrimaryContainer direction="column" additionalClassess={`${commonStyles.inheritBackground}`}>
                        <p className={`${commonStyles.basicHeader4} ${commonStyles.redText}`}>{t("profile.tab.widget.info")}</p>
                        <p className={`${commonStyles.centeredText} ${commonStyles.basicText}`}>
                            {formatNewLines(t("profile.tab.RemoveAccountInfo"))}
                        </p>
                        <PrimaryContainer direction="row" additionalClassess={`${commonStyles.inheritBackground} ${commonStyles.basicGap} ${commonStyles.padding1em}`}>
                            <PrimaryButton color="red" onClick={() => dispatch(disableUserStart())}>
                                {t("main.confirm")}
                            </PrimaryButton>
                            <PrimaryButton color="grey" gradient={true} onClick={() => setIsPopupVisible(false)}>
                                {t("main.cancel")}
                            </PrimaryButton>
                        </PrimaryContainer>
                    </PrimaryContainer>
                </Popup>
            </PrimaryContainer>
        </PageContainer>
    );
}

export default EditProfile;