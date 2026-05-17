import React from "react";

import Header from "../../components/header/header";
import ContentContainer from "../../components/content-container/content-container";
import styles from "./page-container.module.scss";

type MainPropsT = {
    additionalClassess?: string;
    children: React.ReactNode;
};

const PageContainer: React.FC<MainPropsT> = ({ additionalClassess, children }) => {
    return (
        <div className={`${styles.pageContainer}${additionalClassess ? ` ${additionalClassess}` : ""}`}>
            <Header />
            <ContentContainer>{children}</ContentContainer>
        </div>
    );
};

export default PageContainer;
