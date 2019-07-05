import { Layout } from "antd";
import React from "react";
import { layoutConfig } from "../../../config/layoutConfig";
import BaseMenu from "./BaseMenu";
import { ISiderProps } from "./index";
import styles from "./index.module.less";

interface ISideMenu extends ISiderProps {
  handleFirstChange: () => void;
  isFirst: boolean;
}

const SideMenu: React.FC<ISideMenu> = (props: ISideMenu) => {
  const {
    collapsed,
    handleCollapsedChange,
    isMobile,
    isFirst,
    handleFirstChange
  } = props;
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
      <div className={styles.logo} id="logo">
        {layoutConfig.siderMenu.showLogo && (
          <img src={layoutConfig.siderMenu.logo} alt="logo" />
        )}
        {!layoutConfig.siderMenu.showLogo && collapsed && (
          <span className={styles.placeholder} />
        )}
        <h1>Aoko</h1>
      </div>
      <BaseMenu />
    </Layout.Sider>
  );
};

export default SideMenu;
