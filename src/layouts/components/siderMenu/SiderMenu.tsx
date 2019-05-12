import { Layout } from "antd";
import React from "react";
import { connect } from "react-redux";
import logo from "../../../assets/logo.svg";
import { StoreStateType } from "../../../config/store";
import { IMenuState } from "../../store/menuReducer";
import BaseMenu from "./BaseMenu";
import styles from "./SiderMenu.module.less";

const SideMenu: React.FC<IMenuState> = (props: IMenuState) => {
  const { collapsed } = props;
  return (
    <Layout.Sider
      breakpoint="lg"
      trigger={null}
      collapsible={true}
      collapsed={collapsed}
    >
      <div className={styles.logo} id="logo">
        <img src={logo} alt="logo" />
        <h1>Aoko</h1>
      </div>
      <BaseMenu />
    </Layout.Sider>
  );
};

const mapState = ({ menu }: StoreStateType) => {
  return {
    collapsed: menu.collapsed
  };
};

export default connect(mapState)(SideMenu);
