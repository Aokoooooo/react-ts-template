import React, { ComponentType } from "react";
import * as styles from "./index.module.less";

interface IBasicPageLayoutProps {
  Header?: ComponentType;
  Content?: ComponentType;
  Footer?: ComponentType;
}

const BasicPageLayout = (props: IBasicPageLayoutProps) => {
  const { Header, Content, Footer } = props;
  return (
    <div className={styles.basicPageLayout}>
      {Header && (
        <div className={styles.header}>
          <Header />
        </div>
      )}

      {Content && (
        <div className={styles.content}>
          <Content />
        </div>
      )}

      {Footer && (
        <div className={styles.footer}>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default BasicPageLayout;
