import React, { type MouseEvent } from "react";
import styles from "./game-button.module.scss";

export type TGameButtonSize = "scale" | "standard" | "tile";
export type TGameButtonColor = "grey" | "glass" | "violet" | "correct" | "incorrect";

interface GameButtonProps {
    additionalClasses?: string;
    children?: React.ReactNode;
    color?: TGameButtonColor;
    disabled?: boolean;
    number?: number | string;
    onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    selected?: boolean;
    size?: TGameButtonSize;
    title?: string;
}

const GameButton: React.FC<GameButtonProps> = ({
    additionalClasses,
    children,
    color = "grey",
    disabled = false,
    number,
    onClick,
    selected = false,
    size = "standard",
    title,
}) => {
    return (
        <button
            className={`${styles.gameButton} ${styles[size]} ${styles[color]}${selected ? ` ${styles.selected}` : ""}${additionalClasses ? ` ${additionalClasses}` : ""}`}
            onClick={onClick}
            disabled={disabled}
            title={title}
        >
            {children}
            {number !== undefined && number !== null && (
                <span className={styles.numberBadge}>{number}</span>
            )}
        </button>
    );
};

export default GameButton;
