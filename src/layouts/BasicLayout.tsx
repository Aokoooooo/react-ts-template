import loadable from "@loadable/component";
import { Layout } from "antd";
import className from "classnames";
import React from "react";
import { ContainerQuery } from "react-container-query";
import Media from "react-media";
import { RouteProps } from "react-router-dom";
import styles from "./BasicLayout.module.less";
import MenuContext from "./MenuContext";

const SideMenu = loadable(() => import("./components/sideMenu/SideMenu"));

export interface IBasicLayout extends RouteProps {
  isMobile: boolean;
}

class BasicLayout extends React.Component<IBasicLayout> {
  public componentDidMount() {
    // TODO fetch user's data & setting
  }

  public getMenuContext = () => {
    const { location } = this.props;
    return { location };
  };

  public render() {
    const { children } = this.props;
    const { Header, Footer, Content } = Layout;
    return (
      <>
        <ContainerQuery query={query}>
          {params => (
            <MenuContext.Provider value={this.getMenuContext()}>
              <div className={className(params)}>
                <Layout className={styles.basicLayout}>
                  <SideMenu />
                  <Layout>
                    <Header>Header</Header>
                    <Content> {children}</Content>
                    <Footer>Footer</Footer>
                  </Layout>
                </Layout>
              </div>
            </MenuContext.Provider>
          )}
        </ContainerQuery>
      </>
    );
  }
}

export default () => (
  <Media query="(max-width:599px)">
    {isMobile => <BasicLayout isMobile={isMobile} />}
  </Media>
);

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
