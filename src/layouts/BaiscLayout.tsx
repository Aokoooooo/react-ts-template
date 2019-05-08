import className from "classnames";
import React from "react";
import { ContainerQuery } from "react-container-query";

const query = {
  "screen-xs": {
    maxWidth: 575
  },
  "screen-sm": {
    minWidth: 576,
    maxWidth: 767
  },
  "screen-md": {
    minWidth: 768,
    maxWidth: 991
  },
  "screen-lg": {
    minWidth: 992,
    maxWidth: 1199
  },
  "screen-xl": {
    minWidth: 1200,
    maxWidth: 1599
  },
  "screen-xxl": {
    minWidth: 1600
  }
};

class BasicLayout extends React.Component {
  public componentDidMount() {
    // TODO fetch user's data & setting
  }

  public render() {
    return (
      <>
        <ContainerQuery query={query}>
          {params => <div className={className(params)} />}
        </ContainerQuery>
      </>
    );
  }
}
