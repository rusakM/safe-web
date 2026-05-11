import React from "react";
import style from "./root-container.module.scss";
import { componentsTypes } from "../../types";

const RootContainer: React.FC<componentsTypes.IComponentWithChildren> = ({ children }) => (
    <div className={style.container}>
        <div className={style.viewer}>{children}</div>
    </div>
);

export default RootContainer;
