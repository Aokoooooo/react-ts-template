import { Layout } from "antd";
import React, { useState } from "react";
import BaseMenu from "./BaseMenu";

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
      <BaseMenu />
    </Layout.Sider>
  );
};

export default SideMenu;
