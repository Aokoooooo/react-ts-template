import loadable, { LoadableComponent } from "@loadable/component";
import { ReactNode } from "react";
export interface IMenuConfig {
  path?: string;
  component?: LoadableComponent<{}> | undefined;
  type?: string; // default, subMenu, group, divider
  title?: string;
  icon?: ReactNode;
  disabled?: boolean;
  children?: IMenuConfig[];
}

export const menuConfig: IMenuConfig[] = [
  {
    path: "/hello",
    component: loadable(() => import("../pages/HelloWorld")),
    title: "Hello World"
  }
];
