import React from "react";
import { componentsTypes } from "../../types";
import styles from "./card.module.scss";

const Card: React.FC<componentsTypes.IComponentWithChildren> = ({ children }) => (
    <div className={styles.cardContainer}>
        { children }
    </div>
)

export default Card;