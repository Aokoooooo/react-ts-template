import { Icon, Layout } from "antd";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { StoreStateType } from "../../../config/store";
import { changeCollapsed } from "../../store/menuAction";
import { IMenuState } from "../../store/menuReducer";
import styles from "./BaseHeader.module.less";

interface IBaseHeader extends IMenuState {
  handleTriggerClick: () => void;
}

const BaseHeader: React.FC<IBaseHeader> = (props: IBaseHeader) => {
  const { collapsed, handleTriggerClick } = props;
  return (
    <Layout.Header className={styles.header}>
      <span className={styles.trigger} onClick={handleTriggerClick}>
        <Icon type={collapsed ? "menu-unfold" : "menu-fold"} />
      </span>
      <h2>header</h2>
    </Layout.Header>
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
)(BaseHeader);
