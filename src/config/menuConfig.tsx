import loadable from "@loadable/component";
import { Icon } from "antd";
import React, { ComponentType, ReactNode } from "react";

export interface IMenuConfig {
  path?: string;
  type?: string; // default, subMenu, group, divider
  title?: string;
  icon?: ReactNode;
  disabled?: boolean;
  component?: ComponentType;
  children?: IMenuConfig[];
}
/**
 * 生成侧边菜单,并将其中的路径和组件作为Route添加到BasicLayout.jsx中
 *
 * Component应该使用loadable动态加载
 * default: path唯一
 * group/subMenu: title_path加起来唯一
 * group无法嵌套或者被嵌套,只能渲染在最外侧菜单中
 */
export const menuConfig: IMenuConfig[] = [
  {
    path: "/hello",
    title: "Hello World",
    icon: "dashboard",
    component: loadable(() => import("../pages/HelloWorld"))
  },
  {
    type: "divider"
  },
  {
    path: "/hello2",
    icon: <Icon type="google" />,
    title: "Hello World"
  },
  {
    path: "/subMenu",
    type: "subMenu",
    title: "subMenu",
    icon: "dashboard",
    children: [
      {
        path: "/subMenu/sub",
        title: "subMenu/1",
        icon: <Icon type="google" />,
        component: loadable(() => import("../pages/HelloWorld"))
      },
      {
        type: "subMenu",
        title: "subMenu/sub",
        icon: <Icon type="google" />,
        children: [
          {
            path: "/subMenu/sub/:id",
            title: "subMenu/sub/:id",
            icon: "dashboard",
            component: loadable(() => import("../pages/HelloWorld"))
          }
        ]
      }
    ]
  },
  {
    type: "divider"
  },
  {
    path: "/group",
    type: "group",
    title: "group",
    icon: "menu",
    children: [
      {
        icon: "menu",
        path: "/group/1",
        title: "group/1"
      },
      {
        icon: "menu",
        path: "/group/2",
        title: "group/2"
      }
    ]
  },
  {
    path: "/subMenu",
    type: "subMenu",
    title: "subMenu3",
    icon: "menu",
    children: [
      {
        icon: "menu",
        path: "http://github.com",
        title: "subMenu/1"
      },
      {
        icon: "menu",
        path: "https://www.lodashjs.com/docs/4.17.5.html#indexOf",
        title: "subMenu/2"
      }
    ]
  },
  {
    type: "divider"
  }
];

/**
 * 遍历合并item的path,用于控制菜单的默认选择项
 */
const getMenuItemPaths = () => {
  if (!menuConfig) {
    return [];
  }
  const result = new Array<string>();
  const getMenuItemPathsHelper = (i: IMenuConfig) => {
    if (!i) {
      return;
    }
    if ((!i.type || i.type === "default") && i.path) {
      result.push(i.path);
    }
    if ((i.type === "subMenu" || i.type === "group") && i.children) {
      i.children.map(j => getMenuItemPathsHelper(j));
    }
  };
  menuConfig.map(i => getMenuItemPathsHelper(i));
  return result;
};

export const getSubMenuKey = (
  title: string | undefined,
  path: string | undefined
) => `${title}_${path}_submenu`;
export const getGroupKey = (
  title: string | undefined,
  path: string | undefined
) => `${title}_${path}_group`;
export const menuItemPaths = getMenuItemPaths();
