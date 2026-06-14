import { getCurrentLocale } from "../translations/utils";
import type { IMaterial } from "../types/material";
import { constantsUrls } from "./constants";
import { LocalesEnum } from "./constants/translations";

export const getMaterialUrl = (material: IMaterial, lang?: LocalesEnum): string => {
    if (!lang) lang = getCurrentLocale();
    const name = material.names?.[lang]?.name ?? material.names[LocalesEnum.en]?.name;
    return `${constantsUrls.Materials.cdnMaterials}/${name}`;
}

export const getMaterialPageUrl = (material: IMaterial, lang?: LocalesEnum, page?: number): string => {
    if (!lang) lang = getCurrentLocale();
    if (!material.names?.[lang]?.name) lang = LocalesEnum.en;
    if (!page || page < 1) page = 1;
    return `${constantsUrls.Materials.cdnMaterials}/pages/${material.materialNumber}/${lang}/${page.toString().padStart(3, '0')}.pdf`;
}