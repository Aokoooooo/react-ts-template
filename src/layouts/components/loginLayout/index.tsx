import { Icon } from "antd";
import React, { ComponentType } from "react";
import { layoutConfig } from "../../../config/layoutConfig";
import { dynamicLoadWithLoading } from "../../../utils";
import { ILinkConfig } from "../footer";
import BaseFooter from "../footer/BaseFooter";
import withLoading from "../Loading";
import styles from "./index.module.less";

const footerLinks: ILinkConfig[] = [
  {
    key: "Aoko",
    title: <Icon type="github" />,
    href: "https://github.com/Aokoooooo/react-ts-template",
    blankTarget: true
  }
];

const loginLayout = (Component: ComponentType, showFooter: boolean = false) => {
  return withLoading(() => (
    <div className={styles.container}>
      <div className={styles.content}>
        <Component />
      </div>
      {showFooter && layoutConfig.footer.show && (
        <span className={styles.footer}>
          <BaseFooter links={footerLinks} copyright={`Copyright Aoko`} />
        </span>
      )}
    </div>
  ));
};

export default loginLayout;
