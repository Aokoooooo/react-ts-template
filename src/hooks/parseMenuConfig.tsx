import { Icon, Menu } from "antd";
import React, { ReactNode, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import history from "../config/history";
import {
  getGroupKey,
  getSubMenuKey,
  IMenuConfig,
  menuConfig
} from "../config/menuConfig";
import checkAuth from "../utils/checkAuth";

const parseMenuConfigToMenus = (): ReactNode => {
  const stack = new Array<string>();

  const getSubMenuItems = (config: IMenuConfig): ReactNode => {
    if (!config) {
      return;
    }

    if (config.auth && !checkAuth(config.auth)) {
      return;
    }

    if (config.type === "subMenu") {
      const prefix = stack.reduce((x, y) => x + y, "");
      stack.push(config.path || "");
      const tsx = (
        <Menu.SubMenu
          disabled={config.disabled}
          title={getIconWithTitle(config)}
          key={getSubMenuKey(config.title, `${prefix}${config.path}`)}
        >
          {config.children && config.children.map(i => getSubMenuItems(i))}
        </Menu.SubMenu>
      );
      stack.pop();
      return tsx;
    }
    return getMenuItem(config);
  };

  const getMenuItem = (config: IMenuConfig): ReactNode => {
    if (!config) {
      return;
    }
    if (config.type && config.type !== "default") {
      return;
    }
    if (Array.isArray(config)) {
      throw new Error(
        `config should be a object instead of a array as a menuItem config`
      );
    }
    if (!config.path) {
      throw new Error(
        `menuItem's field named (path) cant be null or a empty string`
      );
    }

    if (config.auth && !checkAuth(config.auth)) {
      return;
    }

    const prefix = stack.reduce((x, y) => x + y, "");
    const itemPath = isExternalUrl(config.path)
      ? config.path
      : `${prefix}${config.path}`;
    return (
      <Menu.Item
        key={
          isExternalUrl(config.path)
            ? `_${config.path}`
            : `${prefix}${config.path}`
        }
        title={config.title}
        onClick={() => handleMenuItemClick(itemPath)}
      >
        {getIconWithTitle(config)}
      </Menu.Item>
    );
  };

  const getIconWithTitle = (config: IMenuConfig): ReactNode => {
    let icon = null;
    if (config && config.icon) {
      typeof config.icon === "string"
        ? (icon = <Icon type={config.icon} />)
        : (icon = config.icon);
    }
    return icon ? (
      <>
        {icon}
        <span>{config.title}</span>
      </>
    ) : (
      config.title
    );
  };

  const handleMenuItemClick = (path: string | undefined): void => {
    if (!path) {
      return;
    }
    if (isExternalUrl(path)) {
      window.open(path);
    } else {
      if (history.location.pathname === path) {
        history.replace(path);
        return;
      }
      history.push(path);
    }
  };

  const isExternalUrl = (path: string) => /^https?:\/\//.test(path);

  return menuConfig.map(i => {
    switch (i.type) {
      case "subMenu":
        return getSubMenuItems(i);
      case "group":
        return (
          <Menu.ItemGroup title={i.title} key={getGroupKey(i.title, i.path)}>
            {i.children &&
              i.children.map(j => {
                return j.type === "subMenu"
                  ? getSubMenuItems(j)
                  : getMenuItem(j);
              })}
          </Menu.ItemGroup>
        );
      case "divider":
        return <Menu.Divider key={(Math.random() * 1000000).toFixed(0)} />;
      default:
        return getMenuItem(i);
    }
  });
};
const initMenu = parseMenuConfigToMenus();

export const useParseMenuConfigToMenus = () => {
  const config = menuConfig;
  const [menus, setMenus] = useState(initMenu);

  useEffect(() => {
    setMenus(parseMenuConfigToMenus());
  }, [config]);

  return menus;
};

const parseMenuConfigToRoutes = () => {
  const parseMenuConfigToRoutesHelper = (
    i: IMenuConfig,
    routes: IMenuConfig[],
    stack: string[]
  ): void => {
    if (!i.type || i.type === "default") {
      if (!i.path) {
        throw new Error("menu Item's path should not be null/empty");
      }
      const prefix = stack.reduce((x, y) => x + y, "");
      if (i.auth && !checkAuth(i.auth)) {
        return;
      }
      routes.push(
        <Route
          key={`${prefix}${i.path}`}
          exact={!i.notExact}
          path={`${prefix}${i.path}`}
          component={i.component}
        />
      );
    } else if (i.type === "group" && i.children) {
      i.children.map(j => parseMenuConfigToRoutesHelper(j, routes, stack));
    } else if (i.type === "subMenu" && i.children) {
      stack.push(i.path || "");
      i.children.map(j => parseMenuConfigToRoutesHelper(j, routes, stack));
      stack.pop();
    }
  };

  const routes = new Array<IMenuConfig>();
  const stack = new Array<string>();
  menuConfig.map((i: IMenuConfig): void =>
    parseMenuConfigToRoutesHelper(i, routes, stack)
  );
  return routes;
};
const initRoutes = parseMenuConfigToRoutes();

export const useParseMenuConfigToRoutes = () => {
  const config = menuConfig;
  const [routes, setRoutes] = useState(initRoutes);

  useEffect(() => {
    setRoutes(parseMenuConfigToRoutes());
  }, [config]);

  return routes;
};
