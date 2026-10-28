import { LocalesEnum } from "../helpers/constants/translations";

export interface IMaterial {
    _id: string;
    materialNumber: number;
    names: { [key in LocalesEnum]: {
        name: string;
        pages: number;
    }};
    translation: string;
}