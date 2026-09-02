import { UserRoleEnum } from "../../types/user";
export type TLocale = "en" | "fr" | "it" | "pl" | "pt" | "sl" | "sv";

export enum LocalesEnum {
    en = 'en',
    fr = 'fr',
    it = 'it',
    pl = 'pl',
    pt = 'pt',
    sl = 'sl',
    sv = 'sv',
}

export const ROLES_TRANSLATIONS: {[key in UserRoleEnum]: string} = {
    [UserRoleEnum.STUDENT]: 'main.roles.student',
    [UserRoleEnum.TEACHER]: 'main.roles.teacher'
}