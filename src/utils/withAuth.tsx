import { useOnMount } from "aqua-hooks";
import React, { ComponentType } from "react";
import { gotoLogin } from ".";
import checkAuth, { AuthAskedType } from "./checkAuth";

const withAuth = (authority: AuthAskedType, onFail?: () => void) => (
  WrappedComponent: ComponentType<any>
): React.FC => props => {
  useOnMount(() => {
    checkAuth(
      authority,
      typeof onFail === "function" ? onFail : gotoLogin,
      true
    );
  });

  return <WrappedComponent {...props} />;
};
export default withAuth;
