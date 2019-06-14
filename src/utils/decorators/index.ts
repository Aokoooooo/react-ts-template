import React from "react";
import { Reducer } from "redux";
import history from "../../config/history";
import { injectReducer } from "../../config/store";

// 将page对应的reducer注入到store中
export const withReducer = (key: string, reducer: Reducer) => (
  WrappedComponent: any
) => {
  injectReducer(key, reducer);
};

export const withAuthority = (authoritiesAsked: string[]) => (
  WrappedComponent: any
) => {
  const hasAuthority = (authorityHad: string[]): boolean => {
    if (authoritiesAsked.length === 0) {
      return true;
    }

    if (authorityHad.length === 0) {
      return false;
    }
    for (const i of authorityHad) {
      if (authoritiesAsked.indexOf(i) >= 0) {
        return true;
      }
    }
    return false;
  };
  console.log("check auth");
  if (!hasAuthority([])) {
    history.replace("/403");
  }
};
