import { Icon, Layout } from "antd";
import Animate from "rc-animate";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { layoutConfig } from "../../../config/layoutConfig";
import { StoreStateType } from "../../../config/store";
import { changeCollapsed } from "../../store/layoutAction";
import BaseHeader from "./BaseHeader";
import styles from "./index.module.less";

interface IHeader {
  handleTriggerClick: () => void;
  isMobile: boolean;
  collapsed: boolean;
}

const Header: React.FC<IHeader> = (props: IHeader) => {
  const { collapsed, handleTriggerClick, isMobile } = props;

  const getHeadWidth = () => {
    const fixed = layoutConfig.header.fixed;
    if (isMobile || !fixed) {
      return "100%";
    }
    return collapsed ? "calc(100% - 80px)" : "calc(100% - 256px)";
  };

  return (
    <Animate component="" transitionName="fade">
      <Layout.Header
        style={{ padding: 0, width: getHeadWidth(), zIndex: 2 }}
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
        <span className={styles.trigger} onClick={handleTriggerClick}>
          <Icon type={collapsed ? "menu-unfold" : "menu-fold"} />
        </span>
        <BaseHeader />
      </Layout.Header>
    </Animate>
  );
};

const mapState = ({ layout }: StoreStateType) => {
  return {
    collapsed: layout.collapsed
  };
};

const mapAction = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      handleTriggerClick: changeCollapsed
    },
    dispatch
  );
};

export default connect(
  mapState,
  mapAction
)(Header);
