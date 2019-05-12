import { Icon, Layout } from "antd";
import React, { ReactNode } from "react";
import { layoutConfig } from "../../../config/layoutConfig";
import BaseFooter from "./BaseFooter";
import styles from "./index.module.less";

export interface ILinkConfig {
  key: string;
  title: ReactNode;
  href: string;
  blankTarget: boolean;
}

const links: ILinkConfig[] = [
  {
    key: "Aoko",
    title: <Icon type="github" />,
    href: "https://github.com/Aokoooooo/react-ts-template",
    blankTarget: true
  }
];

const Footer: React.FC = () => {
  return (
    <Layout.Footer
      className={`${layoutConfig.footer.fixed ? styles.fixedFooter : ""}`}
    >
      <BaseFooter links={links} copyright={`Copyright Aoko`} />
    </Layout.Footer>
  );
};

export default Footer;
