import { useOnMount } from "aqua-hooks";
import React from "react";
import history from "../../config/history";

interface IRedirectProps {
  to?: string;
}

const Redirect: React.FC<IRedirectProps> = (props: IRedirectProps) => {
  const { to } = props;
  useOnMount(() => {
    history.replace(to || "/");
  });
  return <div />;
};

export default Redirect;
