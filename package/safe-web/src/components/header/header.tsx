import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { useTranslate } from "@tolgee/react";

import { constantsTranslations, constantsUrls } from "../../helpers/constants";
import tolgeeConfig from "../../translations";
import styles from "./header.module.scss";

//components
import DropdownMenu from "../dropdown-menu/dropdown-menu";
import PrimaryButton from "../primary-button/primary-button";

//icons
import Logo from "../../assets/icons/logo.png";
import TranslationIcon from "../../assets/icons/lang.svg";
import HamburgerMenuIcon from "../../assets/icons/hamburger_menu_button.svg";
import HamburgerMenuIconClicked from "../../assets/icons/hamburger_menu_button_click.svg";
import UserIcon from "../../assets/icons/user.svg";

//redux
import {
    selectHeaderMenuHidden,
    selectLanguagesMenuHidden,
    selectUserMenuHidden,
} from "../../redux/dropdown-menu/dropdown-menu.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import {
    hideAll,
    toggleHeaderMenuHidden,
    toggleLanguagesMenuHidden,
    toggleUserMenuHidden
} from "../../redux/dropdown-menu/dropdown-menu.actions";
import { signOut, userEditStart } from "../../redux/user/user.actions";
import type { IUser } from "../../types/user";
import { capitalizeFirstLetter } from "../../helpers/shared.functions";

enum MENU_ACTIONS {
    COURSE = "COURSE",
    MAIN_PAGE = "MAIN_PAGE",
    MATERIALS = "MATERIALS",
    ME = "ME",
    SIMULATOR = "SIMULATOR",
}

enum USER_MENU_ACTIONS {
    USER_PROFILE = "USER_PROFILE",
    LOGOUT = "LOGOUT"
}

const Header: React.FC = () => {
    const isMobile = useMediaQuery({ maxWidth: 1280 });
    const { t } = useTranslate();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const isHeaderMenuHidden = useSelector(selectHeaderMenuHidden);
    const isLanguagesMenuHidden = useSelector(selectLanguagesMenuHidden);
    const isUserMenuHidden = useSelector(selectUserMenuHidden);

    const languagesMenuRef = useRef<HTMLElement>(null);
    const headerMenuRef = useRef<HTMLElement>(null);
    const headerButtonRef = useRef<HTMLDivElement>(null);
    const languagesButtonRef = useRef<HTMLDivElement>(null);
    const userMenuRef = useRef<HTMLElement>(null);
    const userButtonRef = useRef<HTMLDivElement>(null);

    const hideAllMenus = useCallback(() => dispatch(hideAll()), []);
    const saveSelectedLanguage = (language: IUser['userInterfaceLanguage']) => dispatch(userEditStart({ userInterfaceLanguage: language }));
    const signOutStart = () => dispatch(signOut());

    const handleClickOutsideMenu = useCallback((event: MouseEvent) => {
        const target = event.target as Node;

        const menus = [headerMenuRef, languagesMenuRef, userMenuRef];
        const buttons = [headerButtonRef, languagesButtonRef, userButtonRef];

        const isInsideMenu = menus.some(ref => ref?.current?.contains(target));
        const isInsideButton = buttons.some(ref => ref?.current?.contains(target));

        if (!isInsideMenu && !isInsideButton) {
            if (!isHeaderMenuHidden || !isLanguagesMenuHidden || !isUserMenuHidden) {
                hideAllMenus();
            }
        }

        document.removeEventListener('mousedown', handleClickOutsideMenu);
    }, [isHeaderMenuHidden, isLanguagesMenuHidden, isUserMenuHidden, hideAllMenus]);

    useEffect(() => {
        if (!isHeaderMenuHidden || !isLanguagesMenuHidden || !isUserMenuHidden) document.addEventListener('mousedown', handleClickOutsideMenu)
        else document.removeEventListener('mousedown', handleClickOutsideMenu);
    }, [handleClickOutsideMenu, isHeaderMenuHidden, isLanguagesMenuHidden, isUserMenuHidden]);

    const languages: [key: constantsTranslations.TLocale, value: string][] = [
        ["nl-BE", t("header.languages.belgian")],
        ["en", t("header.languages.english")],
        ["it", t("header.languages.italian")],
        ["pt", t("header.languages.portuguese")],
        ["pl", t("header.languages.polish")],
        ["sl", t("header.languages.slovenian")],
        ["sv", t("header.languages.swedish")],
    ];

    const menuItems: [key: MENU_ACTIONS, value: string][] = [
        [MENU_ACTIONS.MAIN_PAGE, t("header.menu.main-page")],
        [MENU_ACTIONS.COURSE, t("header.menu.course")],
        [MENU_ACTIONS.MATERIALS, t("header.menu.materials")],
        [MENU_ACTIONS.SIMULATOR, t("header.menu.simulator")],
    ];

    const userMenuItems: [key: USER_MENU_ACTIONS, value: string][] = [
        [USER_MENU_ACTIONS.USER_PROFILE, t("header.menu.user-profile")],
        [USER_MENU_ACTIONS.LOGOUT, t("header.menu.logout")]
    ];

    const selectLanguage = (language: constantsTranslations.TLocale) => {
        tolgeeConfig.changeLanguage(language);
        localStorage.setItem("locale", language);
        if (currentUser?._id) saveSelectedLanguage(language);
        dispatch(toggleLanguagesMenuHidden());
    };

    const navigateToMainPage = () => {
        navigate(constantsUrls.LandingPage.main);
    };

    const selectMenuAction = (action: MENU_ACTIONS) => {
        switch(action) {
            case MENU_ACTIONS.COURSE:
                navigate(constantsUrls.Main.courses);
                break;
            case MENU_ACTIONS.MAIN_PAGE:
                navigateToMainPage();
                break;
            case MENU_ACTIONS.MATERIALS:
                navigate(constantsUrls.Main.materials);
                break;
            case MENU_ACTIONS.ME:
                navigate(constantsUrls.Main.myProfile);
                break;
            case MENU_ACTIONS.SIMULATOR:
                navigate(constantsUrls.Main.game);
                break;
            default:
                console.log(action);
                break;
        }
    };

    const selectUserMenuAction = (action: USER_MENU_ACTIONS) => {
        switch (action) {
            case USER_MENU_ACTIONS.USER_PROFILE:
                navigate(constantsUrls.Main.myProfile);
                break;
            case USER_MENU_ACTIONS.LOGOUT:
                signOutStart();
                localStorage.removeItem("token");
                break;
            default:
                console.log(action);
                break;
        }
    }

    return (
        <div className={styles.headerWrapper}>
            <div className={styles.headerContainer}>
                <div className={styles.header}>
                    <img
                        src={Logo}
                        alt="Safe-Web Logo"
                        className={styles.logo}
                        onClick={navigateToMainPage}
                    />
                    <div className={styles.content}>
                        <div className={styles.controls}>
                            {
                                currentUser && !isMobile && menuItems.map(([key, value], index) => (
                                    <div className={`${styles.noHover} ${styles.control}`} key={`${key}_${index}`}>
                                        <PrimaryButton color={"white"} gradient={true} rounded={true} onClick={
                                            () => selectMenuAction(key)
                                        }>
                                            {value}
                                        </PrimaryButton>
                                    </div>
                                ))
                            }
                            <div
                                className={`${styles.control} ${styles.controlIcon} ${
                                    !isLanguagesMenuHidden
                                        ? styles.controlActive
                                        : ""
                                }`}
                                onClick={() => dispatch(toggleLanguagesMenuHidden())}
                                ref={languagesButtonRef}
                            >
                                <img src={TranslationIcon} alt="Select language" />
                            </div>
                            {
                                currentUser && isMobile &&
                                <div className={`${styles.control} ${styles.controlIcon} ${
                                    !isHeaderMenuHidden ? styles.controlActive : ""
                                    }`}
                                    onClick={() => dispatch(toggleHeaderMenuHidden())}
                                    ref={headerButtonRef}
                                    >
                                    <img src={isHeaderMenuHidden ? HamburgerMenuIconClicked : HamburgerMenuIcon} alt="Menu" style={{ padding: "1px" }} />
                                </div>
                            }
                            {
                                currentUser &&
                                <div className={`${styles.control} ${styles.controlIcon} ${
                                    !isHeaderMenuHidden ? styles.controlActive : ""
                                    }`}
                                    onClick={() => dispatch(toggleUserMenuHidden())}
                                    ref={userButtonRef}
                                    >
                                    <img src={UserIcon} alt="Profile" />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <DropdownMenu
                isOpen={!isLanguagesMenuHidden}
                items={languages.map(([key, value]) => [key as string, capitalizeFirstLetter(value)])}
                onItemSelect={(item) => selectLanguage(item as constantsTranslations.TLocale)}
                reference={languagesMenuRef}
            />
            {
                currentUser &&
                <DropdownMenu
                    isOpen={!isHeaderMenuHidden}
                    items={menuItems.map(([key, value]) => [key, capitalizeFirstLetter(value)])}
                    onItemSelect={(item) => selectMenuAction(item as MENU_ACTIONS)}
                    reference={headerMenuRef}
                />
            }
            {
                currentUser &&
                <DropdownMenu
                    isOpen={!isUserMenuHidden}
                    items={userMenuItems.map(([key, value]) => [key, capitalizeFirstLetter(value)])}
                    onItemSelect={(item) => selectUserMenuAction(item as USER_MENU_ACTIONS)}
                    reference={userMenuRef}
                />
            }
        </div>
    );
};

export default Header
