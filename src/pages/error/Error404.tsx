import React from "react";
import BaseError from "./components/BaseError";

const Error404: React.FC = () => {
  return <BaseError title="404" desc="抱歉，你访问的页面不存在" />;
};

export default Error404;
