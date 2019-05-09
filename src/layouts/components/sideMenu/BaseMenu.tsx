import { Layout, Menu } from "antd";
import _ from "lodash";
import React, { ReactNode } from "react";
import { IMenuConfig, menuConfig } from "../../../config/menuConfig";

const { Sider } = Layout;

export default class BaseMenu extends React.PureComponent<{}> {
  public key: number;
  constructor(props: {}) {
    super(props);
    this.key = -1;
  }

  public parseMenuConfig = (config: IMenuConfig[]): ReactNode => {
    if (_.isEmpty(config)) {
      return;
    }
    return config.map(i => {
      switch (i.type) {
        case "default":
          return this.getMenuItem(i);
        case "subMenu":
          return;
        case "group":
          return;
        case "divider":
          return;
        default:
          return this.getMenuItem(i);
      }
    });
  };

  public getMenuItem = (config: IMenuConfig): ReactNode => {
    if (_.isEmpty(config)) {
      return;
    }
    if (Array.isArray(config)) {
      return;
    }
    this.key++;
    return (
      <Menu.Item key={this.key} title={config.title}>
        {config.title}
      </Menu.Item>
    );
  };

  public render() {
    return (
      <Sider>
        <Menu>{this.parseMenuConfig(menuConfig)}</Menu>
      </Sider>
    );
  }
}
