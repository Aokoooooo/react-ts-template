import { Drawer } from "antd";
import React from "react";
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

interface ISiderState {
  first: boolean;
}

class Sider extends React.Component<ISiderProps, ISiderState> {
  constructor(props: ISiderProps) {
    super(props);
    this.state = {
      first: true
    };
  }

  public handleFirstChange = () => {
    this.setState({ first: false });
  };

  public render() {
    const { isMobile, collapsed, handleCollapsedChange } = this.props;
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
          {...this.props}
          collapsed={isMobile ? false : collapsed}
          handleFirstChange={this.handleFirstChange}
          isFirst={this.state.first}
        />
      </Drawer>
    ) : (
      <SiderMenu
        {...this.props}
        handleFirstChange={this.handleFirstChange}
        isFirst={this.state.first}
      />
    );
  }
}

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
