import React, { ReactNode } from "react";
import withLoading from "./components/Loading";

export interface IChildren {
  children?: ReactNode;
}

const BlankLayout = ({ children }: IChildren) => <div>{children}</div>;

export default withLoading(BlankLayout);
