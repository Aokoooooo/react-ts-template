import { Layout } from "antd";
import className from "classnames";
import React from "react";
import { ContainerQuery } from "react-container-query";
import Media from "react-media";
import { RouteProps } from "react-router-dom";
import MenuContext from "./MenuContext";
export interface IBasicLayout extends RouteProps {
  isMobile: boolean;
}

export default (
  <Media query="(max-width:599px)">
    {isMobile => <BasicLayout isMobile={isMobile} />}
  </Media>
);

class BasicLayout extends React.Component<IBasicLayout> {
  public componentDidMount() {
    // TODO fetch user's data & setting
  }

  public getMenuContext = () => {
    const { location } = this.props;
    return { location };
  };

  public getLayout = () => {
    const { children } = this.props;
    const { Header, Footer, Sider, Content } = Layout;
    return (
      <Layout>
        <Sider>Sider</Sider>
        <Layout>
          <Header>Header</Header>
          <Content> {children}</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  };

  public render() {
    return (
      <>
        <ContainerQuery query={query}>
          {params => (
            <MenuContext.Provider value={this.getMenuContext()}>
              <div className={className(params)}>{this.getLayout()}</div>
            </MenuContext.Provider>
          )}
        </ContainerQuery>
      </>
    );
  }
}

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
