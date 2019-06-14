import { Reducer } from "redux";
import { injectReducer } from "../../config/store";

// 将page对应的reducer注入到store中
export const withReducer = (key: string, reducer: Reducer) => (
  WrappedComponent: any
) => {
  injectReducer(key, reducer);
};
