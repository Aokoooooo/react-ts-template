import { Icon, Layout } from "antd";
import Animate from "rc-animate";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import logo from "../../../assets/256x256.png";
import { layoutConfig } from "../../../config/layoutConfig";
import { StoreStateType } from "../../../config/store";
import { changeCollapsed } from "../../store/menuAction";
import { IMenuState } from "../../store/menuReducer";
import BaseHeader from "./BaseHeader";
import styles from "./index.module.less";

interface IHeader extends IMenuState {
  handleTriggerClick: () => void;
  isMobile: boolean;
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
    <Animate component="">
      <Layout.Header
        style={{ padding: 0, width: getHeadWidth(), zIndex: 2 }}
        className={`${styles.header} ${
          layoutConfig.header.fixed ? styles.fixedHeader : ""
        }`}
      >
        {isMobile && <img className={styles.logo} src={logo} alt="logo" />}
        <span className={styles.trigger} onClick={handleTriggerClick}>
          <Icon type={collapsed ? "menu-unfold" : "menu-fold"} />
        </span>
        <BaseHeader />
      </Layout.Header>
    </Animate>
  );
};

const mapState = ({ menu }: StoreStateType) => {
  return {
    collapsed: menu.collapsed
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
