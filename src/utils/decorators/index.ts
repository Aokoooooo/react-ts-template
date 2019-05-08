import React from "react";
import { Reducer } from "redux";
import { Epic } from "redux-observable";
import { injectEpic, injectReducer } from "../../config/store";

// tslint:disable-next-line:ban-types
export const bind = <T extends Function>(
  target: object,
  key: string,
  descriptor: TypedPropertyDescriptor<T>
): TypedPropertyDescriptor<T> | void => {
  if (!descriptor || typeof descriptor.value !== "function") {
    throw new Error(
      `Only function could be decorated with @bind.(${key} is ${typeof descriptor.value})`
    );
  }

  return {
    configurable: true,
    get(this: T): T {
      const bound: T = descriptor.value!.bind(this);
      Object.defineProperty(this, key, {
        value: bound,
        configurable: true,
        writable: true
      });
      return bound;
    }
  };
};

// 将page对应的epic注入到epicRoot中
export const withEpic = (key: string, epic: Epic) => (
  WrappedComponent: React.ComponentClass
) => {
  injectEpic(key, epic);
};

// 将page对应的reducer注入到store中
export const withReducer = (key: string, reducer: Reducer) => (
  WrappedComponent: React.ComponentClass
) => {
  injectReducer(key, reducer);
};
