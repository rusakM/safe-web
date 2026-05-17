import DropdownMenuTypes from "./dropdown-menu.types";

export const hideAll = () => ({
    type: DropdownMenuTypes.HIDE_ALL
});

export const toggleHeaderMenuHidden = () => ({
    type: DropdownMenuTypes.TOGGLE_HEADER_MENU_HIDDEN,
});

export const toggleLanguagesMenuHidden = () => ({
    type: DropdownMenuTypes.TOGGLE_LANGUAGES_MENU_HIDDEN,
});

export const toggleUserMenuHidden = () => ({
    type: DropdownMenuTypes.TOGGLE_USER_MENU_HIDDEN
});
