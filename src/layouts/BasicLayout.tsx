import loadable from "@loadable/component";
import { Layout } from "antd";
import className from "classnames";
import React from "react";
import { ContainerQuery } from "react-container-query";
import Media from "react-media";
import { Route, RouteProps, Switch } from "react-router-dom";
import { layoutConfig } from "../config/layoutConfig";
import { IMenuConfig, menuConfig } from "../config/menuConfig";
import styles from "./BasicLayout.module.less";
import MenuContext from "./MenuContext";

const Sider = loadable(() => import("./components/siderMenu"));
const Header = loadable(() => import("./components/header"));
const Footer = loadable(() => import("./components/footer"));

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

  public parseMenuConfig = () => {
    if (!menuConfig) {
      return [];
    }
    const routes = new Array<IMenuConfig>();
    menuConfig.map(
      (i: IMenuConfig): void => this.parseMenuConfigHelper(i, routes)
    );
    return routes;
  };

  public parseMenuConfigHelper = (
    i: IMenuConfig,
    routes: IMenuConfig[]
  ): void => {
    if (!i.type || i.type === "default") {
      routes.push(
        <Route
          key={i.path || (Math.random() * 1000000).toFixed(0)}
          exact={true}
          path={i.path}
          component={i.component}
        />
      );
    } else if (i.type === "group" && i.children) {
      i.children.map(j => this.parseMenuConfigHelper(j, routes));
    } else if (i.type === "subMenu" && i.children) {
      i.children.map(j => this.parseMenuConfigHelper(j, routes));
    }
  };

  public render() {
    const { isMobile } = this.props;
    const { Content } = Layout;
    const contentStyle = layoutConfig.header.fixed ? {} : { paddingTop: 0 };
    return (
      <>
        <ContainerQuery query={query}>
          {params => (
            <MenuContext.Provider value={this.getMenuContext()}>
              <div className={className(params)}>
                <Layout className={styles.basicLayout}>
                  {layoutConfig.siderMenu && <Sider isMobile={isMobile} />}
                  <Layout>
                    {layoutConfig.header && layoutConfig.header.show && (
                      <Header isMobile={isMobile} />
                    )}
                    <Content className={styles.content} style={contentStyle}>
                      <Switch>{[...this.parseMenuConfig()]}</Switch>
                    </Content>
                    {layoutConfig.footer && layoutConfig.footer.show && (
                      <Footer>Footer</Footer>
                    )}
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
