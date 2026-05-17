import type { UnknownAction } from "redux";
import DropdownMenuTypes, { type IDropdownMenuStore } from "./dropdown-menu.types";

const INITIAL_STATE: IDropdownMenuStore = {
    headerMenu: {
        hidden: true,
    },
    languagesMenu: {
        hidden: true,
    },
    userMenu: {
        hidden: true,
    },
};

const menuReducer = (
    state: IDropdownMenuStore = INITIAL_STATE,
    action: UnknownAction
): IDropdownMenuStore => {
    switch (action.type) {
        case DropdownMenuTypes.TOGGLE_HEADER_MENU_HIDDEN:
            return {
                ...INITIAL_STATE,
                headerMenu: {
                    ...state.headerMenu,
                    hidden: !state.headerMenu.hidden,
                },
            };
        case DropdownMenuTypes.TOGGLE_LANGUAGES_MENU_HIDDEN:
            return {
                ...INITIAL_STATE,
                languagesMenu: {
                    ...state.languagesMenu,
                    hidden: !state.languagesMenu.hidden,
                },
            };
        case DropdownMenuTypes.TOGGLE_USER_MENU_HIDDEN:
            return {
                ...INITIAL_STATE,
                userMenu: {
                    ...state.userMenu,
                    hidden: !state.userMenu.hidden
                }
            }
        case DropdownMenuTypes.HIDE_ALL:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default menuReducer;
