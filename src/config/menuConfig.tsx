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
        path: "/subMenu/1",
        title: "subMenu/1",
        icon: <Icon type="google" />
      },
      {
        path: "/subMenu/sub",
        type: "subMenu",
        title: "subMenu/sub",
        icon: <Icon type="google" />,
        children: [
          {
            path: "/subMenu/sub/2",
            title: "subMenu/sub/2",
            icon: "dashboard"
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
    title: "subMenu",
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
