import { Icon, Menu } from "antd";
import { ClickParam } from "antd/lib/menu";
import React, { ReactNode } from "react";
import history from '../../../config/history'
import { IMenuConfig, menuConfig } from "../../../config/menuConfig";

let key = -1

const BaseMenu: React.FC = () => {
  const parseMenuConfig = (config: IMenuConfig[]): ReactNode => {
    if (!config) {
      return;
    }
    return (
      config.map(i => {
        key++;
        switch (i.type) {
          case "default":
            return getMenuItem(i);
          case "subMenu":
            return (
              <Menu.SubMenu disabled={i.disabled} title={getIconWithTitle(i)} key={key}>
                {i.children && getSubMenuItems(i.children)}
              </Menu.SubMenu>
            )
          case "group":
            return (
              <Menu.ItemGroup title={i.title} key={key}>
                {i.children && i.children.map(j => {
                  key++
                  return getMenuItem(j)
                })}
              </Menu.ItemGroup>
            )
          case "divider":
            return <Menu.Divider key={key} />;
          default:
            return getMenuItem(i);
        }
      })
    )
  };

  const getSubMenuItems = (config: IMenuConfig[]): ReactNode => {
    return config.map(i => {
      if (!i.type || i.type === 'default') {
        key++;
        return getMenuItem(i)
      }
      if (i.type === 'subMenu') {
        key++
        return (
          <Menu.SubMenu disabled={i.disabled} title={getIconWithTitle(i)} key={key}>
            {i.children && getSubMenuItems(i.children)}
          </Menu.SubMenu>)
      }
    })
  }

  const getMenuItem = (config: IMenuConfig): ReactNode => {
    if (!config) {
      return;
    }
    if (Array.isArray(config)) {
      throw new Error(`config should be a object instead of a array as a menuItem config`)
    }
    return (
      <Menu.Item key={key} title={config.title} onClick={(e: ClickParam) => handleMenuItemClick(config)}>
        {getIconWithTitle(config)}
      </Menu.Item>
    );
  };

  const getIconWithTitle = (config: IMenuConfig): ReactNode => {
    let icon = null
    if (config && config.icon) {
      typeof config.icon === 'string' ?
        icon = <Icon type={config.icon} /> :
        icon = config.icon
    }
    return icon ? <>{icon}<span>{config.title}</span></> : config.title
  }

  const handleMenuItemClick = (config: IMenuConfig): void => {
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

  return (<div>
    <Menu mode='inline'>
      {parseMenuConfig(menuConfig)}
    </Menu>
  </div>
  );
}

export default BaseMenu
