import { Icon, Menu } from "antd";
import { isEmpty } from "lodash";
import React, { ReactNode, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import {
  getGroupKey,
  getSubMenuKey,
  IMenuConfig,
  menuConfig,
  menuType
} from "../config/menuConfig";
import { basePath } from "../config/systemParams";
import checkAuth from "../utils/checkAuth";

const parseMenuConfigToMenus = (): ReactNode => {
  let key = 0;
  const stack = new Array<string>();

  const getSubMenuItems = (config: IMenuConfig): ReactNode => {
    if (!config) {
      return;
    }

    if (config.auth && !checkAuth(config.auth)) {
      return;
    }

    if (config.type === menuType.SUBMENU) {
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
    if (config.type && config.type !== menuType.DEFAULT) {
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
    return (
      <Menu.Item
        key={
          isExternalUrl(config.path)
            ? `_${config.path}`
            : `${prefix}${config.path}`
        }
        title={config.title}
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

  const isExternalUrl = (path: string) => /^https?:\/\//.test(path);

  const emptyMenuFilter = (configs: IMenuConfig[]) => {
    const check = (i: IMenuConfig) => {
      return i.type === menuType.SUBMENU || i.type === menuType.GROUP;
    };
    return configs.filter(i => {
      if (!i) {
        return false;
      }
      if (!checkAuth(i.auth)) {
        return false;
      }
      if (check(i)) {
        let temp = menuConfig;
        if (i.children) {
          temp = emptyMenuFilter(i.children);
        }
        if (i.children && !isEmpty(temp)) {
          return true;
        }
        return false;
      }
      return true;
    });
  };

  return emptyMenuFilter(menuConfig).map(i => {
    switch (i.type) {
      case menuType.SUBMENU:
        return getSubMenuItems(i);
      case menuType.GROUP:
        return (
          <Menu.ItemGroup title={i.title} key={getGroupKey(i.title, i.path)}>
            {i.children &&
              i.children.map(j => {
                return j.type === menuType.SUBMENU
                  ? getSubMenuItems(j)
                  : getMenuItem(j);
              })}
          </Menu.ItemGroup>
        );
      case menuType.DIVIDER:
        return <Menu.Divider key={key++} />;
      default:
        return getMenuItem(i);
    }
  });
};

export const useParseMenuConfigToMenus = () => {
  const config = menuConfig;
  const [menus, setMenus] = useState([] as ReactNode);

  useEffect(() => {
    setMenus(parseMenuConfigToMenus());
  }, [config]);

  return menus;
};

const parseMenuConfigToRoutes = (isFirst: boolean = false) => {
  const parseMenuConfigToRoutesHelper = (
    i: IMenuConfig,
    routes: JSX.Element[],
    stack: string[]
  ): void => {
    if (!i.type || i.type === menuType.DEFAULT) {
      if (!i.path) {
        throw new Error("menu Item's path should not be null/empty");
      }
      if (!isFirst && !checkAuth(i.auth)) {
        return;
      }
      const prefix = stack.reduce((x, y) => x + y, "");
      routes.push(
        <Route
          key={`${prefix}${i.path}`}
          exact={!i.notExact}
          path={`${basePath}${prefix}${i.path}`}
          component={i.component}
        />
      );
    } else if (i.type === menuType.GROUP && i.children) {
      i.children.map(j => parseMenuConfigToRoutesHelper(j, routes, stack));
    } else if (i.type === menuType.SUBMENU && i.children) {
      if (i.component) {
        const prefix = stack.reduce((x, y) => x + y, "");
        if (!isFirst && !checkAuth(i.auth)) {
          return;
        }
        routes.push(
          <Route
            key={`${prefix}${i.path}`}
            exact={!i.notExact}
            path={`${basePath}${prefix}${i.path}`}
            component={i.component}
          />
        );
      }
      stack.push(i.path || "");
      i.children.map(j => parseMenuConfigToRoutesHelper(j, routes, stack));
      stack.pop();
    }
  };

  const routes = new Array<JSX.Element>();
  const stack = new Array<string>();
  menuConfig.forEach(i => parseMenuConfigToRoutesHelper(i, routes, stack));
  return routes;
};

const initRoutes = parseMenuConfigToRoutes(true);

export const useParseMenuConfigToRoutes = () => {
  const config = menuConfig;
  const [routes, setRoutes] = useState(initRoutes);

  useEffect(() => {
    setRoutes(parseMenuConfigToRoutes());
  }, [config]);

  return routes;
};
