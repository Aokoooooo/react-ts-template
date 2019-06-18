import { Menu } from "antd";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import {
  getSubMenuKey,
  IMenuConfig,
  menuConfig,
  menuItemPaths
} from "../../../config/menuConfig";
import { useParseMenuConfigToMenus } from "../../../hooks/parseMenuConfig";

const BaseMenu: React.FC<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  const menus = useParseMenuConfigToMenus();

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
    const stack = new Array<string>();
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

  return (
    <div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={getSelectItem()}
        defaultOpenKeys={getDefaultOpenKeys()}
      >
        {menus}
      </Menu>
    </div>
  );
};

export default withRouter(BaseMenu);
