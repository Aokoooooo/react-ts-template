import { ComponentType, ReactNode } from "react";
import { RouteComponentProps } from "react-router-dom";
import { dynamicLoadWithLoading } from "../utils";
import history from "./history";

export interface IMenuConfig {
  path?: string;
  type?: menuType;
  title?: string;
  icon?: ReactNode;
  disabled?: boolean;
  notExact?: boolean;
  auth?: string[] | string;
  component?: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
  children?: IMenuConfig[];
}

export enum menuType {
  DEFAULT = "default",
  SUBMENU = "subMenu",
  GROUP = "group",
  DIVIDER = "divider"
}

/**
 * 生成侧边菜单,并将其中的路径和组件作为Route添加到BasicLayout.jsx中
 *
 * Component应该使用loadable动态加载
 * (title,path)的组合唯一
 * group/subMenu: title_path加起来唯一
 * group无法被嵌套,只能渲染在最外侧菜单中
 */
export let menuConfig: IMenuConfig[] = [
  {
    path: "/transfer",
    title: "划款操作",
    icon: "swap",
    component: dynamicLoadWithLoading(() =>
      import("../pages/transfer/operation")
    )
  },
  {
    path: "/transferResult",
    title: "划款结果查询",
    icon: "audit"
  },
  {
    path: "/protocol",
    title: "协议查询",
    icon: "file"
  },
  {
    path: "/balance",
    title: "余额查询",
    icon: "credit-card"
  },
  {
    path: "/funds",
    title: "资金流水查询",
    icon: "fund"
  },
  {
    path: "/openAccountsResult",
    title: "子账户开户结果查询",
    icon: "user"
  },
  {
    path: "/upload",
    title: "文件传输",
    icon: "upload"
  },
  {
    path: "/auth",
    type: menuType.SUBMENU,
    title: "权限管理",
    icon: "bars",
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
  }
];

export const updateMenuConfig = (newConfig: IMenuConfig[]) => {
  menuConfig = newConfig;
  history.replace(history.location.pathname);
};
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
    if ((!i.type || i.type === menuType.DEFAULT) && i.path) {
      const prefix = stack.reduce((x, y) => x + y, "");
      result.push(prefix + i.path);
    }
    if (i.type === menuType.SUBMENU && i.children) {
      stack.push(i.path || "");
      i.children.map(j => getMenuItemPathsHelper(j));
      stack.pop();
    }
    if (i.type === menuType.GROUP && i.children) {
      i.children.map(j => getMenuItemPathsHelper(j));
    }
  };
  menuConfig.map(i => getMenuItemPathsHelper(i));
  return result;
};

export const menuItemPaths = getMenuItemPaths();

export const getSubMenuKey = (
  title: string | undefined,
  path: string | undefined
) => `${title}_${path}_submenu`;

export const getGroupKey = (
  title: string | undefined,
  path: string | undefined
) => `${title}_${path}_group`;
