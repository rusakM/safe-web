import type { IDropdownMenuStore } from "./dropdown-menu/dropdown-menu.types";
import type { IUserState } from "./user/user.types";

export interface IStore {
    dropdownMenu: IDropdownMenuStore;
    user: IUserState;
}

export interface IAction<T> {
    type: string;
    payload: T;
}
