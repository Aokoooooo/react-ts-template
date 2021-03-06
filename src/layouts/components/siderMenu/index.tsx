import { Drawer } from "antd";
import React, { useState } from "react";
import { useActions, useSelector } from "../../../hooks/basicPageHooks";
import { changeCollapsed } from "../../store/";
import SiderMenu from "./SiderMenu";

const Sider: React.FC = () => {
  const [first, setFirst] = useState(true);
  const actions = useActions({ handleCollapsedChange: changeCollapsed });
  const { isMobile, collapsed } = useSelector(({ layout }) => layout);
  const handleFirstChange = () => {
    setFirst(false);
  };

  return isMobile ? (
    <Drawer
      visible={!collapsed}
      placement="left"
      closable={false}
      onClose={actions.handleCollapsedChange}
      style={{
        padding: 0,
        height: "100vh"
      }}
    >
      <SiderMenu
        isMobile={isMobile}
        handleCollapsedChange={actions.handleCollapsedChange}
        collapsed={isMobile ? false : collapsed}
        handleFirstChange={handleFirstChange}
        isFirst={first}
      />
    </Drawer>
  ) : (
    <SiderMenu
      isMobile={isMobile}
      handleCollapsedChange={actions.handleCollapsedChange}
      collapsed={collapsed}
      handleFirstChange={handleFirstChange}
      isFirst={first}
    />
  );
};

export default Sider;
