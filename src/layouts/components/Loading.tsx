import { Spin } from "antd";
import React, { ComponentType, ReactNode } from "react";
import { connect } from "react-redux";
import { StoreStateType } from "../../config/store";

interface ILoadingProps {
  children: ReactNode;
  spinning: boolean;
}

const Loading: React.FC<ILoadingProps> = ({
  spinning,
  children
}: ILoadingProps) => {
  return (
    <Spin
      delay={200}
      size={"large"}
      spinning={spinning}
      style={{ zIndex: 100000, maxHeight: "80vh" }}
    >
      {children}
    </Spin>
  );
};

const mapState = ({ layout }: StoreStateType) => {
  return {
    spinning: layout.spining
  };
};

const LoadingContainer = connect(mapState)(Loading);

const withLoading = (WrappedComponent: ComponentType): React.FC => {
  return () => (
    <LoadingContainer>
      <WrappedComponent />
    </LoadingContainer>
  );
};

export default withLoading;
