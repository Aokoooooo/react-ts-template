import loadable from "@loadable/component";
import { Layout } from "antd";
import className from "classnames";
import React from "react";
import { ContainerQuery } from "react-container-query";
import Media from "react-media";
import { Redirect, Route, RouteProps, Switch } from "react-router-dom";
import { layoutConfig } from "../config/layoutConfig";
import { defaultUrl, IMenuConfig, menuConfig } from "../config/menuConfig";
import checkAuth from "../utils/checkAuth";
import styles from "./BasicLayout.module.less";
import withLoading from "./components/Loading";
import MenuContext from "./MenuContext";

const Sider = loadable(() => import("./components/siderMenu"));
const Header = loadable(() => import("./components/header"));
const Footer = loadable(() => import("./components/footer"));
const Error403 = loadable(() => import("../pages/error/Error403"));
const Error404 = loadable(() => import("../pages/error/Error404"));
const Error500 = loadable(() => import("../pages/error/Error500"));

export interface IBasicLayout extends RouteProps {
  isMobile: boolean;
}

const BasicLayout: React.FC<IBasicLayout> = (props: IBasicLayout) => {
  const getMenuContext = () => {
    const { location } = props;
    return { location };
  };

  const parseMenuConfig = () => {
    if (!menuConfig) {
      return [];
    }
    const routes = new Array<IMenuConfig>();
    const stack = new Array<string>();
    menuConfig.map((i: IMenuConfig): void =>
      parseMenuConfigHelper(i, routes, stack)
    );
    return routes;
  };

  const parseMenuConfigHelper = (
    i: IMenuConfig,
    routes: IMenuConfig[],
    stack: string[]
  ): void => {
    if (!i.type || i.type === "default") {
      if (!i.path) {
        throw new Error("menu Item's path should not be null/empty");
      }
      const prefix = stack.reduce((x, y) => x + y, "");
      if (i.auth && !checkAuth(i.auth)) {
        return;
      }
      routes.push(
        <Route
          key={`${prefix}${i.path}`}
          exact={!i.notExact}
          path={`${prefix}${i.path}`}
          component={i.component}
        />
      );
    } else if (i.type === "group" && i.children) {
      i.children.map(j => parseMenuConfigHelper(j, routes, stack));
    } else if (i.type === "subMenu" && i.children) {
      stack.push(i.path || "");
      i.children.map(j => parseMenuConfigHelper(j, routes, stack));
      stack.pop();
    }
  };

  const { isMobile } = props;
  const { Content } = Layout;
  const contentStyle = layoutConfig.header.fixed ? {} : { paddingTop: 0 };
  return (
    <>
      <ContainerQuery query={query}>
        {params => (
          <MenuContext.Provider value={getMenuContext()}>
            <div className={className(params)}>
              <Layout className={styles.basicLayout}>
                {layoutConfig.siderMenu && <Sider isMobile={isMobile} />}
                <Layout>
                  {layoutConfig.header && layoutConfig.header.show && (
                    <Header isMobile={isMobile} />
                  )}
                  <Content className={styles.content} style={contentStyle}>
                    <Switch>
                      <Route
                        path="/"
                        exact={true}
                        render={() => <Redirect to={defaultUrl} />}
                      />
                      {[...parseMenuConfig()]}
                      <Route path="/403" exact={true} component={Error403} />
                      <Route path="/404" exact={true} component={Error404} />
                      <Route path="/500" exact={true} component={Error500} />
                      <Route render={() => <Redirect to="/404" />} />
                    </Switch>
                  </Content>
                  {layoutConfig.footer && layoutConfig.footer.show && (
                    <Footer />
                  )}
                </Layout>
              </Layout>
            </div>
          </MenuContext.Provider>
        )}
      </ContainerQuery>
    </>
  );
};

export default withLoading(() => (
  <Media query="(max-width:599px)">
    {isMobile => <BasicLayout isMobile={isMobile} />}
  </Media>
));

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
