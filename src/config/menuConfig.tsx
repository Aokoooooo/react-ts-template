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

// 默认跳转路由
export const defaultUrl = "/transfer";

/**
 * 生成侧边菜单,并将其中的路径和组件作为Route添加到BasicLayout.jsx中
 *
 * Component应该使用loadable动态加载
 * (title,path)的组合唯一
 * group/subMenu: title_path加起来唯一
 * group无法被嵌套,只能渲染在最外侧菜单中
 */
export const menuConfig: IMenuConfig[] = [
  {
    path: "/transfer",
    title: "划款操作",
    icon: "dashboard"
  },
  {
    path: "/transferInfo",
    title: "划款结果查询",
    icon: "dashboard"
  },
  {
    path: "/protocolInfo",
    title: "协议查询",
    icon: "dashboard"
  },
  {
    path: "/balanceInfo",
    title: "余额查询",
    icon: "dashboard"
  },
  {
    path: "/fundsInfo",
    title: "资金流水查询",
    icon: "dashboard"
  },
  {
    path: "/openAccountsResult",
    title: "子账户开户结果查询",
    icon: "dashboard"
  },
  {
    path: "/upload",
    title: "文件传输",
    icon: "dashboard"
  },
  {
    path: "/auth",
    type: "subMenu",
    title: "权限管理",
    icon: "dashboard",
    children: [
      {
        path: "/account",
        title: "账号管理"
      },
      {
        path: "/role",
        title: "角色管理"
      },
      {
        path: "/password",
        title: "修改密码"
      }
    ]
  },
  {
    path: "/subMenu",
    type: "subMenu",
    title: "subMenu",
    icon: "dashboard",
    children: [
      {
        path: "/sub",
        title: "sub",
        icon: <Icon type="google" />,
        component: loadable(() => import("../pages/HelloWorld"))
      },
      {
        type: "subMenu",
        title: "sub",
        path: "/sub",
        icon: <Icon type="google" />,
        children: [
          {
            path: "/id",
            title: "id",
            icon: "dashboard",
            component: loadable(() => import("../pages/HelloWorld"))
          }
        ]
      }
    ]
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
  const stack = new Array<string>();
  const getMenuItemPathsHelper = (i: IMenuConfig) => {
    if (!i) {
      return;
    }
    if ((!i.type || i.type === "default") && i.path) {
      const prefix = stack.reduce((x, y) => x + y, "");
      result.push(prefix + i.path);
    }
    if (i.type === "subMenu" && i.children) {
      stack.push(i.path || "");
      i.children.map(j => getMenuItemPathsHelper(j));
      stack.pop();
    }
    if (i.type === "group" && i.children) {
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
