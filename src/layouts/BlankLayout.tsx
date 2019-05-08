import React from "react";

export interface IChildren {
  children?: any;
}

export default ({ children }: IChildren) => <div>{children}</div>;
