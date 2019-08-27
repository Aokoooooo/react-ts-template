import loadable, { DefaultComponent } from "@loadable/component";
import React from "react";
import history from "../config/history";
import { basePath } from "../config/systemParams";
import SuspenseLoading from "../layouts/components/SuspenseLoading";

export const checkLocationPathname = (name: string): boolean => {
  return history.location.pathname === `${basePath}${name}`;
};

export const safeBack = (to?: string) => {
  if (history.length < 3) {
    history.replace("/");
  } else if (to) {
    history.replace(to);
  } else {
    history.goBack();
  }
};

export const dynamicLoadWithLoading = <T extends {}>(
  load: (props: T) => Promise<DefaultComponent<T>>,
  fallback: JSX.Element = <SuspenseLoading />
) => loadable(load, { fallback });
