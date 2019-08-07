import { MutableRefObject, ReactNode } from "react";
import history from "../config/history";
import { basePath } from "../config/systemParams";

export const checkLocationPathname = (name: string): boolean => {
  return history.location.pathname === `${basePath}${name}`;
};

export const bindFormRef = (
  component: ReactNode,
  ref: MutableRefObject<ReactNode>
) => {
  if (ref.current === null) {
    ref.current = component;
  }
};
