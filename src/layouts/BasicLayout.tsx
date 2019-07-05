import loadable from "@loadable/component";
import { Layout } from "antd";
import className from "classnames";
import React, { useEffect } from "react";
import { ContainerQuery } from "react-container-query";
import Media from "react-media";
import { Redirect, Route, RouteProps, Switch } from "react-router-dom";
import { layoutConfig } from "../config/layoutConfig";
import { defaultUrl } from "../config/menuConfig";
import store from "../config/store";
import { useParseMenuConfigToRoutes } from "../hooks/parseMenuConfig";
import styles from "./BasicLayout.module.less";
import withLoading from "./components/Loading";
import MenuContext from "./MenuContext";
import { changeIsMobile } from "./store/layoutAction";

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

  const routes = useParseMenuConfigToRoutes();

  const { isMobile } = props;
  const { Content } = Layout;
  const contentStyle = layoutConfig.header.fixed ? {} : { paddingTop: 0 };

  useEffect(() => {
    store.dispatch(changeIsMobile(isMobile));
  }, [isMobile]);

  return (
    <>
      <ContainerQuery query={query}>
        {params => (
          <MenuContext.Provider value={getMenuContext()}>
            <div className={className(params)}>
              <Layout className={styles.basicLayout}>
                {layoutConfig.siderMenu.show && <Sider isMobile={isMobile} />}
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
                      {routes}
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
