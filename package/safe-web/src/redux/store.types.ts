import type { IDropdownMenuStore } from "./dropdown-menu/dropdown-menu.types";
import type { IUserState } from "./user/user.types";
import type { IMaterialsState } from "./materials/materials.types";

export interface IStore {
    dropdownMenu: IDropdownMenuStore;
    materials: IMaterialsState;
    user: IUserState;
}

export interface IAction<T> {
    type: string;
    payload: T;
}
