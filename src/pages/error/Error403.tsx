import React from "react";
import BaseError from "./components/BaseError";

const Error403: React.FC = () => {
  return <BaseError title="403" desc="抱歉，你无权访问该页面" />;
};

export default Error403;
