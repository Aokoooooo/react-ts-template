import React, { ReactNode } from "react";

export interface IChildren {
  children?: ReactNode;
}

export default ({ children }: IChildren) => <div>{children}</div>;
