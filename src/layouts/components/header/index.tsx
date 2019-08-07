import { Icon, Layout } from "antd";
import Animate from "rc-animate";
import React from "react";
import { useSelector } from "react-redux";
import { layoutConfig } from "../../../config/layoutConfig";
import { StoreStateType } from "../../../config/store";
import { useActions } from "../../../hooks/basicPageHooks";
import { changeCollapsed } from "../../store/layoutAction";
import BaseHeader from "./BaseHeader";
import styles from "./index.module.less";

const Header: React.FC = () => {
  const { isMobile, collapsed } = useSelector(
    ({ layout }: StoreStateType) => layout
  );
  const actions = useActions({ handleTriggerClick: changeCollapsed });

  const headwith = () => {
    const fixed = layoutConfig.header.fixed;
    if (isMobile || !fixed) {
      return "100%";
    }
    return collapsed ? "calc(100% - 80px)" : "calc(100% - 256px)";
  };

  return (
    <Animate component="" transitionName="fade">
      <Layout.Header
        style={{ padding: 0, width: headwith(), zIndex: 2 }}
        className={`${styles.header} ${
          layoutConfig.header.fixed ? styles.fixedHeader : ""
        }`}
      >
        {isMobile && layoutConfig.header.showLogo && (
          <img
            className={styles.logo}
            src={layoutConfig.header.logo}
            alt="logo"
          />
        )}
        <span className={styles.trigger} onClick={actions.handleTriggerClick}>
          <Icon type={collapsed ? "menu-unfold" : "menu-fold"} />
        </span>
        <BaseHeader />
      </Layout.Header>
    </Animate>
  );
};

export default Header;
