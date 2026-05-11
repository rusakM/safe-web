import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslate } from "@tolgee/react";

import { constantsTranslations, constantsUrls } from "../../helpers/constants";
import tolgeeConfig from "../../translations";
import { useDeviceType } from "../../helpers/responsiveContainers";
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
} from "../../redux/dropdown-menu/dropdown-menu.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import {
    hideAll,
    toggleHeaderMenuHidden,
    toggleLanguagesMenuHidden,
} from "../../redux/dropdown-menu/dropdown-menu.actions";
import { signOut, userEditStart } from "../../redux/user/user.actions";
import type { IUser } from "../../types/user";


enum MENU_ACTIONS {
    COURSE = "COURSE",
    LOGOUT = "LOGOUT",
    MAIN_PAGE = "MAIN_PAGE",
    MATERIALS = "MATERIALS",
    ME = "ME",
    SIMULATOR = "SIMULATOR",
}

const Header: React.FC = () => {
    const { isMobile } = useDeviceType();
    const { t } = useTranslate();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const isHeaderMenuHidden = useSelector(selectHeaderMenuHidden);
    const isLanguagesMenuHidden = useSelector(selectLanguagesMenuHidden);

    const languagesMenuRef = useRef<HTMLElement>(null);
    const headerMenuRef = useRef<HTMLElement>(null);
    const headerButtonRef = useRef<HTMLDivElement>(null);
    const languagesButtonRef = useRef<HTMLDivElement>(null);

    const hideAllMenus = useCallback(() => dispatch(hideAll()), []);
    const saveSelectedLanguage = (language: IUser['userInterfaceLanguage']) => dispatch(userEditStart({ userInterfaceLanguage: language }));
    const signOutStart = () => dispatch(signOut());
    const toggleHeaderMenu = () => dispatch(toggleHeaderMenuHidden());
    const toggleLanguagesMenu = () => dispatch(toggleLanguagesMenuHidden());

    const handleClickOutsideMenu = useCallback((event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const isHeaderButton = headerButtonRef?.current?.contains(target as Node) || languagesButtonRef?.current?.contains(target as Node);
        if (!headerMenuRef?.current?.contains(target as Node) 
            && !languagesMenuRef?.current?.contains(target as Node) 
            && !isHeaderButton
        ) {
            if (!isHeaderMenuHidden || !isLanguagesMenuHidden) hideAllMenus();
        }
        document.removeEventListener('mousedown', handleClickOutsideMenu);
    }, [isHeaderMenuHidden, isLanguagesMenuHidden, hideAllMenus ]);

    useEffect(() => {
        if (!isHeaderMenuHidden || !isLanguagesMenuHidden) document.addEventListener('mousedown', handleClickOutsideMenu)
        else document.removeEventListener('mousedown', handleClickOutsideMenu);
    }, [handleClickOutsideMenu, isHeaderMenuHidden, isLanguagesMenuHidden]);

    const languages: [key: constantsTranslations.TLocale, value: string][] = [
        ["el", t("header.languages.greek")],
        ["en", t("header.languages.english")],
        ["da", t("header.languages.danish")],
        ["it", t("header.languages.italian")],
        ["pt", t("header.languages.portuguese")],
        ["pl", t("header.languages.polish")],
        ["sv", t("header.languages.swedish")],
    ];

    const menuItems: [key: MENU_ACTIONS, value: string][] = [
        [MENU_ACTIONS.MAIN_PAGE, t("header.menu.main-page")],
        [MENU_ACTIONS.COURSE, t("header.menu.course")],
        [MENU_ACTIONS.MATERIALS, t("header.menu.materials")],
        [MENU_ACTIONS.SIMULATOR, t("header.menu.simulator")],
        [MENU_ACTIONS.LOGOUT, t("header.menu.logout")]
    ];

    const onClickHeaderMenu = () => {
        if (!isLanguagesMenuHidden) toggleLanguagesMenu();
        if (isHeaderMenuHidden) toggleHeaderMenu();
        else hideAllMenus()
    };

    const onClickLanguagesMenu = () => {
        if (!isHeaderMenuHidden) toggleHeaderMenu();
        if (isLanguagesMenuHidden) toggleLanguagesMenu();
        else hideAllMenus();
    };

    const selectLanguage = (language: constantsTranslations.TLocale) => {
        tolgeeConfig.changeLanguage(language);
        localStorage.setItem("locale", language);
        if (currentUser?._id) saveSelectedLanguage(language);
        toggleLanguagesMenu();
    };

    const navigateToMainPage = () => {
        navigate(constantsUrls.LandingPage.main);
    };

    const selectMenuAction = (action: MENU_ACTIONS) => {
        switch(action) {
            case MENU_ACTIONS.COURSE:
                navigate(constantsUrls.Main.startLessons);
                break;
            case MENU_ACTIONS.LOGOUT:
                signOutStart();
                localStorage.removeItem("token");
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
                                        <PrimaryButton color={"grey"} rounded={true} onClick={
                                            () => selectMenuAction(key)
                                        }>
                                            {value}
                                        </PrimaryButton>
                                    </div>
                                ))
                            }
                            <div
                                className={`${styles.control} ${styles.translationsButton} ${
                                    !isLanguagesMenuHidden
                                        ? styles.controlActive
                                        : ""
                                }`}
                                onClick={onClickLanguagesMenu}
                                ref={languagesButtonRef}
                            >
                                <img src={TranslationIcon} alt="Select language" />
                            </div>
                            {
                                currentUser && isMobile &&
                                <div className={`${styles.control} ${
                                    !isHeaderMenuHidden ? styles.controlActive : ""
                                    }`}
                                    onClick={onClickHeaderMenu}
                                    ref={headerButtonRef}
                                    >
                                    <img src={isHeaderMenuHidden ? HamburgerMenuIconClicked : HamburgerMenuIcon} alt="Menu" />
                                </div>
                            }
                            {
                                currentUser && !isMobile &&
                                <div className={`${styles.control} ${
                                    !isHeaderMenuHidden ? styles.controlActive : ""
                                    }`}
                                    onClick={onClickHeaderMenu}
                                    ref={headerButtonRef}
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
                items={languages}
                onItemSelect={(item) => selectLanguage(item as constantsTranslations.TLocale)}
                reference={languagesMenuRef}
            />
            {
                currentUser &&
                <DropdownMenu
                    isOpen={!isHeaderMenuHidden}
                    items={menuItems.map(([key, value]) => [key, value])}
                    onItemSelect={(item) => selectMenuAction(item as MENU_ACTIONS)}
                    reference={headerMenuRef}
                />
            }
        </div>
    );
};

export default Header
