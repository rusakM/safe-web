import { createSelector } from "reselect";
import type { IStore } from "../store.types";

const selectMenu = (state: IStore) => state.dropdownMenu;

export const selectHeaderMenuHidden = createSelector(
    [selectMenu],
    (menu: IStore["dropdownMenu"]) => menu.headerMenu.hidden
);

export const selectLanguagesMenuHidden = createSelector(
    [selectMenu],
    (menu: IStore["dropdownMenu"]) => menu.languagesMenu.hidden
);

export const selectUserMenuHidden = createSelector(
    [selectMenu],
    (menu: IStore["dropdownMenu"]) => menu.userMenu.hidden
);