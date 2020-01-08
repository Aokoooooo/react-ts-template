import React, { ReactNode } from "react";
import * as styles from "./index.module.less";

interface IBasicPageLayoutProps {
  Header?: ReactNode;
  Content?: ReactNode;
  Footer?: ReactNode;
}

const BasicPageLayout = (props: IBasicPageLayoutProps) => {
  const { Header, Content, Footer } = props;

  return (
    <div className={styles.basicPageLayout}>
      {Header && (
        <div className={styles.header}>
          {typeof Header === "function" ? <Header /> : Header}
        </div>
      )}

      {Content && (
        <div className={styles.content}>
          {typeof Content === "function" ? <Content /> : Content}
        </div>
      )}

      {Footer && (
        <div className={styles.footer}>
          {typeof Footer === "function" ? <Footer /> : Footer}
        </div>
      )}
    </div>
  );
};

export default BasicPageLayout;
