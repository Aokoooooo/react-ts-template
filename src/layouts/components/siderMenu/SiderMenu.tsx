import { Layout } from "antd";
import React from "react";
import history from "../../../config/history";
import { layoutConfig } from "../../../config/layoutConfig";
import BaseMenu from "./BaseMenu";
import styles from "./index.module.less";

interface ISideMenuProps {
  handleFirstChange: () => void;
  isFirst: boolean;
  collapsed: boolean;
  handleCollapsedChange: () => void;
  isMobile: boolean;
}

const SideMenu: React.FC<ISideMenuProps> = (props: ISideMenuProps) => {
  const {
    collapsed,
    handleCollapsedChange,
    isMobile,
    isFirst,
    handleFirstChange
  } = props;

  const handleTitleClick = () => {
    history.push("/");
  };

  return (
    <Layout.Sider
      className={styles.sider}
      breakpoint="lg"
      trigger={null}
      collapsible={true}
      collapsed={collapsed}
      width={256}
      onCollapse={() => {
        if (isFirst || !isMobile) {
          handleCollapsedChange();
        }
        if (isFirst) {
          handleFirstChange();
        }
      }}
    >
      <div className={styles.logo} id="logo" onClick={handleTitleClick}>
        {layoutConfig.siderMenu.showLogo && (
          <img src={layoutConfig.siderMenu.logo} alt="logo" />
        )}
        {!layoutConfig.siderMenu.showLogo && collapsed && (
          <span className={styles.placeholder} />
        )}
        <h1>{layoutConfig.siderMenu.title}</h1>
      </div>
      <BaseMenu />
    </Layout.Sider>
  );
};

export default SideMenu;
