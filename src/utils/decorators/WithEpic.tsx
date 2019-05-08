import React from "react";
import { Epic } from "redux-observable";
import { injectEpic } from "../../config/store";

// 将page对应的epic注入到epicRoot中
export default (key: string, epic: Epic) => (
  WrappedComponent: React.ComponentClass
) => {
  injectEpic(key, epic);
};
