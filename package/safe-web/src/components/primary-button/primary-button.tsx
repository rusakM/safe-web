import React, { type MouseEvent } from "react";
import styles from "./primary-button.module.scss";
import { getCurrentLocale } from "../../translations/utils";

export type TButtonColor = "grey" | "violet" | "red" | "white" | "transparent";
export type TButtonSize = "regular" | "large";
export type TButtonType = "default" | "action";

interface PrimaryButtonProps {
    additionalClasses?: string;
    animated?: boolean;
    children: React.ReactNode;
    color: TButtonColor;
    disabled?: boolean;
    gradient?: boolean;
    icon?: boolean;
    increaseHorizontalPadding?: boolean;
    onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    rounded?: boolean;
    selected?: boolean;
    size?: TButtonSize;
    title?: string;
    type?: TButtonType;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    additionalClasses,
    animated = false,
    children,
    color = "grey",
    disabled = false,
    gradient = false,
    icon = false,
    increaseHorizontalPadding = false,
    onClick,
    rounded = false,
    selected = false,
    size = "regular",
    title,
    type = "default"
}) => {
    return (
        <button
            className={`${styles.button} ${styles[color]} ${size !== 'regular' ? styles[size] : ''}${selected ? ` ${styles[`selected${color}`]}` : ''}${rounded ? ` ${styles.circle}` : ''}${gradient ? ` ${styles.gradient}` : ''}${increaseHorizontalPadding ? ` ${styles.increasedHorizontalPadding}` : ''}${icon ? ` ${styles.icon}` : ''}${animated ? ` ${styles.animated}` : ''}${additionalClasses ? ` ${additionalClasses}` : ''}${type !== "default" ? ` ${styles[type]}` : ''}`}
            onClick={onClick}
            disabled={disabled}
            lang={getCurrentLocale()}
            title={title}
            
        >
            {children}
        </button>
    );
};

export default PrimaryButton;
