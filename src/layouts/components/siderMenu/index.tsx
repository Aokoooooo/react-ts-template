import { Drawer } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { StoreStateType } from "../../../config/store";
import { changeCollapsed } from "../../store/menuAction";
import { IMenuState } from "../../store/menuReducer";
import SiderMenu from "./SiderMenu";

export interface ISiderProps extends IMenuState {
  isMobile: boolean;
  collapsed: boolean;
  handleCollapsedChange: () => void;
}

const Sider: React.FC<ISiderProps> = (props: ISiderProps) => {
  const [first, setFirst] = useState(true);

  const handleFirstChange = () => {
    setFirst(false);
  };

  const { isMobile, collapsed, handleCollapsedChange } = props;
  return isMobile ? (
    <Drawer
      visible={!collapsed}
      placement="left"
      closable={false}
      onClose={handleCollapsedChange}
      style={{
        padding: 0,
        height: "100vh"
      }}
    >
      <SiderMenu
        {...props}
        collapsed={isMobile ? false : collapsed}
        handleFirstChange={handleFirstChange}
        isFirst={first}
      />
    </Drawer>
  ) : (
    <SiderMenu
      {...props}
      handleFirstChange={handleFirstChange}
      isFirst={first}
    />
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
      handleCollapsedChange: changeCollapsed
    },
    dispatch
  );
};

export default connect(
  mapState,
  mapAction
)(Sider);
