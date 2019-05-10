import { Icon, Menu } from "antd";
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { IMenuConfig, menuConfig } from "../../../config/menuConfig";

let key = -1;

const BaseMenu: React.FC = () => {
  const parseMenuConfig = (config: IMenuConfig[]): ReactNode => {
    if (!config) {
      return;
    }
    return config.map(i => {
      key++;
      switch (i.type) {
        case "default":
          return getMenuItem(i);
        case "subMenu":
          return (
            <Menu.SubMenu
              disabled={i.disabled}
              title={getIconWithTitle(i, false)}
              key={key}
            >
              {i.children && getSubMenuItems(i.children)}
            </Menu.SubMenu>
          );
        case "group":
          return (
            <Menu.ItemGroup title={i.title} key={key}>
              {i.children &&
                i.children.map(j => {
                  key++;
                  return getMenuItem(j);
                })}
            </Menu.ItemGroup>
          );
        case "divider":
          return <Menu.Divider key={key} />;
        default:
          return getMenuItem(i);
      }
    });
  };

  const getSubMenuItems = (config: IMenuConfig[]): ReactNode => {
    return config.map(i => {
      if (!i.type || i.type === "default") {
        key++;
        return getMenuItem(i);
      }
      if (i.type === "subMenu") {
        key++;
        return (
          <Menu.SubMenu
            disabled={i.disabled}
            title={getIconWithTitle(i, false)}
            key={key}
          >
            {i.children && getSubMenuItems(i.children)}
          </Menu.SubMenu>
        );
      }
    });
  };

  const getMenuItem = (config: IMenuConfig): ReactNode => {
    if (!config) {
      return;
    }
    if (Array.isArray(config)) {
      throw new Error(
        `config should be a object instead of a array as a menuItem config`
      );
    }
    return (
      <Menu.Item key={key} title={config.title}>
        {getIconWithTitle(config, true)}
      </Menu.Item>
    );
  };

  const getIconWithTitle = (
    config: IMenuConfig,
    isItem: boolean
  ): ReactNode => {
    if (!isItem) {
      return getIconWithTitleHelper(config);
    }
    if (config && config.path) {
      return /^https?:\/\//.test(config.path) ? (
        <a href={config.path} target="_Blank">
          {getIconWithTitleHelper(config)}
        </a>
      ) : (
        <Link to={config.path}>{getIconWithTitleHelper(config)}</Link>
      );
    }
    return getIconWithTitleHelper(config);
  };

  const getIconWithTitleHelper = (config: IMenuConfig): ReactNode => {
    let icon = null;
    if (config && config.icon) {
      typeof config.icon === "string"
        ? (icon = <Icon type={config.icon} />)
        : (icon = config.icon);
    }
    return icon ? (
      <>
        {icon}
        <span>{config.title }</span>
      </>
    ) : (
      config.title
    );
  };

  return (
    <div>
      <Menu theme="dark" mode="inline">
        {parseMenuConfig(menuConfig)}
      </Menu>
    </div>
  );
};

export default BaseMenu;
