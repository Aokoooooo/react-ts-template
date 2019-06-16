import loadable from "@loadable/component";
import { ComponentType, ReactNode } from "react";
import { RouteComponentProps } from "react-router-dom";
export interface IMenuConfig {
  path?: string;
  type?: string; // default, subMenu, group, divider
  title?: string;
  icon?: ReactNode;
  disabled?: boolean;
  auth?: string[] | string;
  component?: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
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
    auth: ["user"],
    icon: "swap",
    component: loadable(() => import("../pages/transfer/operation"))
  },
  {
    path: "/transferResult",
    title: "划款结果查询",
    auth: ["user"],
    icon: "audit"
  },
  {
    path: "/protocol",
    title: "协议查询",
    auth: ["user"],
    icon: "file"
  },
  {
    path: "/balance",
    title: "余额查询",
    auth: ["user"],
    icon: "credit-card"
  },
  {
    path: "/funds",
    title: "资金流水查询",
    auth: ["user"],
    icon: "fund"
  },
  {
    path: "/openAccountsResult",
    title: "子账户开户结果查询",
    auth: ["user"],
    icon: "user"
  },
  {
    path: "/upload",
    title: "文件传输",
    auth: ["user"],
    icon: "upload"
  },
  {
    path: "/auth",
    type: "subMenu",
    title: "权限管理",
    auth: ["user"],
    icon: "bars",
    children: [
      {
        path: "/account",
        title: "账号管理",
        auth: ["user"]
      },
      {
        path: "/role",
        title: "角色管理",
        auth: ["user"]
      },
      {
        path: "/password",
        title: "修改密码",
        auth: ["user"]
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
