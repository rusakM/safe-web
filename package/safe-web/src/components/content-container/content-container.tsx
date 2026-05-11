import React from "react";
import styles from "./content-container.module.scss";
import { componentsTypes } from "../../types";


const ContentContainer: React.FC<componentsTypes.IComponentWithChildren> = ({ children }) => {
    return <div className={styles.contentContainer}>{children}</div>;
};

export default ContentContainer;
