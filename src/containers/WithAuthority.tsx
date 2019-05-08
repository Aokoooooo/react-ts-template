import React from "react";
import { Redirect } from "react-router";

export default (authoritiesAsked: string[]) => (
  WrappedComponent: React.ComponentType
): any => {
  return class extends React.Component {
    constructor(props: any) {
      super(props);
    }

    public hasAuthority = (
      authoritiesRequired: string[],
      authorityHad: string[]
    ): boolean => {
      if (authoritiesRequired.length === 0) {
        return true;
      }

      if (authorityHad.length === 0) {
        return false;
      }
      for (const i of authorityHad) {
        if (authoritiesRequired.indexOf(i) >= 0) {
          return true;
        }
      }
      return false;
    };

    public render() {
      // const { authorityHad } = this.props
      const hasAuthority = this.hasAuthority(authoritiesAsked, []);
      return hasAuthority ? <WrappedComponent /> : <Redirect to="/login" />;
    }
  };
};
