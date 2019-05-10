import { Icon, Layout, Menu } from "antd";
import { ClickParam } from "antd/lib/menu";
import React, { ReactNode } from "react";
import history from '../../../config/history'
import { IMenuConfig, menuConfig } from "../../../config/menuConfig";

const { Sider } = Layout;
let key = -1

export default class BaseMenu extends React.PureComponent<{}> {
  constructor(props: {}) {
    super(props);
  }

  public parseMenuConfig = (config: IMenuConfig[]): ReactNode => {
    if (!config) {
      return;
    }
    return (
      config.map(i => {
        key++;
        switch (i.type) {
          case "default":
            return this.getMenuItem(i);
          case "subMenu":
            return (
              <Menu.SubMenu disabled={i.disabled} title={this.getIconWithTitle(i)} key={key}>
                {i.children && this.getSubMenuItems(i.children)}
              </Menu.SubMenu>
            )
          case "group":
            return (
              <Menu.ItemGroup title={i.title} key={key}>
                {i.children && i.children.map(j => {
                  key++
                  return this.getMenuItem(j)
                })}
              </Menu.ItemGroup>
            )
          case "divider":
            return <Menu.Divider key={key} />;
          default:
            return this.getMenuItem(i);
        }
      })
    )
  };

  public getSubMenuItems = (config: IMenuConfig[]): ReactNode => {
    return config.map(i => {
      if (!i.type || i.type === 'default') {
        key++;
        return this.getMenuItem(i)
      }
      if (i.type === 'subMenu') {
        key++
        return (
          <Menu.SubMenu disabled={i.disabled} title={this.getIconWithTitle(i)} key={key}>
            {i.children && this.getSubMenuItems(i.children)}
          </Menu.SubMenu>)
      }
    })
  }

  public getMenuItem = (config: IMenuConfig): ReactNode => {
    if (!config) {
      return;
    }
    if (Array.isArray(config)) {
      throw new Error(`config should be a object instead of a array as a menuItem config`)
    }
    return (
      <Menu.Item key={key} title={config.title} onClick={(e: ClickParam) => this.handleMenuItemClick(config)}>
        {this.getIconWithTitle(config)}
      </Menu.Item>
    );
  };

  public getIconWithTitle = (config: IMenuConfig): ReactNode => {
    let icon = null
    if (config && config.icon) {
      typeof config.icon === 'string' ?
        icon = <Icon type={config.icon} /> :
        icon = config.icon
    }
    return icon ? <>{icon}{config.title}</> : config.title
  }

  public handleMenuItemClick = (config: IMenuConfig): void => {
    const handleInternalLinkClick = (path: string) => {
      history.push(path)
    }
    const handleExternalLinkClick = (path: string) => {
      window.open(path)
    }
    if (config && config.path) {
      return /^https?:\/\//.test(config.path) ? handleExternalLinkClick(config.path) : handleInternalLinkClick(config.path)
    }
  }

  public render() {
    return (
      <Sider>
        <Menu mode='inline'>{this.parseMenuConfig(menuConfig)}</Menu>
      </Sider>
    );
  }
}
