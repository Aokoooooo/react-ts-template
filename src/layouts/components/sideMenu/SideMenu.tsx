import { Layout } from "antd";
import React, { useState } from "react";
import logo from "../../../assets/logo.svg";
import BaseMenu from "./BaseMenu";
import styles from "./index.module.less";

const SideMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout.Sider
      collapsible={true}
      collapsed={collapsed}
      onCollapse={handleCollapsed}
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
