import { Spin } from "antd";
import React, { ComponentType, ReactNode } from "react";
import { useSelector } from "../../hooks/basicPageHooks";

interface ILoadingProps {
  children: ReactNode;
}

const Loading: React.FC<ILoadingProps> = ({ children }: ILoadingProps) => {
  const layout = useSelector(({ layout }) => layout);

  return (
    <Spin
      delay={200}
      size={"large"}
      spinning={layout.spining}
      style={{ zIndex: 100000, maxHeight: "100vh" }}
    >
      {children}
    </Spin>
  );
};
const withLoading = (WrappedComponent: ComponentType): React.FC => {
  return () => (
    <Loading>
      <WrappedComponent />
    </Loading>
  );
};

export default withLoading;
