import React from "react";
import { LocalesEnum } from "../helpers/constants/translations";

export const getCurrentLocale = (): LocalesEnum =>
    localStorage.getItem('locale') as LocalesEnum ?? LocalesEnum.en;

export const formatNewLines = (text: string) => (
    <>
        {text.split("<br>").map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ))}
    </>
);

export const parseBoldTags = (text: string, additionalClassess?: string) => (
    <>
        {text.split(/<b>|<\/b>/g).map((part, index) => (
            <React.Fragment key={index}>
                {index % 2 === 1 ? <strong className={additionalClassess || ""} lang={getCurrentLocale()}>{part}</strong> : part}
            </React.Fragment>
        ))}
    </>
);