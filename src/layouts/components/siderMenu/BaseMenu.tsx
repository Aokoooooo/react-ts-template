import { Icon, Menu } from "antd";
import React, { ReactNode, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import history from "../../../config/history";
import {
  getGroupKey,
  getSubMenuKey,
  IMenuConfig,
  menuConfig,
  menuItemPaths
} from "../../../config/menuConfig";

const BaseMenu: React.FC<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  const stack = new Array<string>();

  const parseMenuConfig = (config: IMenuConfig[]): ReactNode => {
    if (!config) {
      return;
    }

    const getSubMenuItems = (config: IMenuConfig): ReactNode => {
      if (!config) {
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
        const { location } = props;
        if (location.pathname === path) {
          history.replace(path);
          return;
        }
        history.push(path);
      }
    };

    const isExternalUrl = (path: string) => /^https?:\/\//.test(path);

    stack.splice(0, stack.length);
    return config.map(i => {
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

  const getSelectItem = (): string[] => {
    const { location } = props;
    const { pathname } = location;
    const result = menuItemPaths.filter(i => pathname.startsWith(i));
    if (result.length > 1) {
      return [result.reduce((x, y) => (x.length < y.length ? y : x), "")];
    }
    return result;
  };

  const getDefaultOpenKeys = (): string[] => {
    stack.splice(0, stack.length);
    const selectItemKey = getSelectItem();
    if (!selectItemKey || !menuConfig) {
      return [];
    }
    const subMenus = menuConfig.filter(i => i.type === "subMenu");
    if (!subMenus) {
      return [];
    }
    const result = new Array<string>();

    const getSubMenusHelper = (config: IMenuConfig): boolean => {
      const prefix = stack.reduce((x, y) => x + y, "");
      if (!config.type || config.type === "default") {
        if (`${prefix}${config.path}` === selectItemKey[0]) {
          return true;
        }
      }
      if (config.type && config.type === "subMenu" && config.children) {
        result.push(getSubMenuKey(config.title, `${prefix}${config.path}`));
        stack.push(config.path || "");
        for (const i of config.children) {
          if (getSubMenusHelper(i)) {
            return true;
          }
        }
        stack.pop();
        result.pop();
      }
      return false;
    };

    for (const i of subMenus) {
      if (getSubMenusHelper(i)) {
        return result;
      }
    }
    return result;
  };

  const [openKeys, setOpenKeys] = useState<string[]>(getDefaultOpenKeys());

  const handleOpenChange = (newOpenKeys: string[]) => {
    setOpenKeys(newOpenKeys);
  };

  return (
    <div>
      <Menu
        theme="dark"
        mode="inline"
        onOpenChange={handleOpenChange}
        selectedKeys={getSelectItem()}
        openKeys={openKeys}
      >
        {parseMenuConfig(menuConfig)}
      </Menu>
    </div>
  );
};

export default withRouter(BaseMenu);
