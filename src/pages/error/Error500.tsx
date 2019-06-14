import React from "react";
import BaseError from "./components/BaseError";

const Error403: React.FC = () => {
  return <BaseError title="500" desc="抱歉，服务器出错了" />;
};

export default Error403;
