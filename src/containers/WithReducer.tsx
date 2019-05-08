import React from "react";
import { Reducer } from "redux";
import { injectReducer } from "../config/store";

// 将page对应的reducer注入到store中
export default (key: string, reducer: Reducer) => (
  WrappedComponent: React.ComponentClass
) => {
  injectReducer(key, reducer);
};
