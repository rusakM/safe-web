import { UserRoleEnum } from "../../types/user";
export type TLocale = "da" | "el" | "en" | "it" | "pl" | "pt" | "sv";

export enum LocalesEnum {
    da = 'da',
    el = 'el',
    en = 'en',
    it = 'it',
    pl = 'pl',
    pt = 'pt',
    sv = 'sv',
}

export const ROLES_TRANSLATIONS: {[key in UserRoleEnum]: string} = {
    [UserRoleEnum.STUDENT]: 'main.roles.student',
    [UserRoleEnum.TEACHER]: 'main.roles.teacher'
}