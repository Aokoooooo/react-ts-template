import { ComponentType } from "react";
import { injectReducer } from "../../config/store";

// 将page对应的reducer注入到store中
export const withReducer = (key: string, reducer: any) => <P extends {}>(
  WrappedComponent: ComponentType<P>
) => {
  injectReducer(key, reducer);
};
