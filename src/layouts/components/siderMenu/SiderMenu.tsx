import { Layout } from "antd";
import React from "react";
import logo from "../../../assets/logo.svg";
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
        <img src={logo} alt="logo" />
        <h1>Aoko</h1>
      </div>
      <BaseMenu />
    </Layout.Sider>
  );
};

export default SideMenu;
