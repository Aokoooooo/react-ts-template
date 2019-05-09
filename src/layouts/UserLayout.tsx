import React from "react";
import { RouteProps } from "react-router";

export interface IUSerLayout extends RouteProps {
  key?: string;
}

class UserLayout extends React.Component {
  constructor(props: IUSerLayout) {
    super(props);
  }

  public render() {
    return <div>user layout</div>;
  }
}

export default UserLayout;
