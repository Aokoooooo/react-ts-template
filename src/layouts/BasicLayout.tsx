import { Layout, Modal } from "antd";
import className from "classnames";
import React, { useEffect } from "react";
import { ContainerQuery } from "react-container-query";
import Media from "react-media";
import { Route, RouteProps, Switch } from "react-router-dom";
import { updateIsAuthenticationCheckBlocked } from "../config/axios";
import { layoutConfig } from "../config/layoutConfig";
import { basePath } from "../config/systemParams";
import { useActions, useOnMount, useOnUnmount } from "../hooks/basicPageHooks";
import { useParseMenuConfigToRoutes } from "../hooks/parseMenuConfig";
import { dynamicLoadWithLoading } from "../utils";
import styles from "./BasicLayout.module.less";
import Footer from "./components/footer";
import Header from "./components/header";
import withLoading from "./components/Loading";
import Redirect from "./components/Redirect";
import Sider from "./components/siderMenu";
import { changeIsMobile } from "./store/layoutAction";

const Home = dynamicLoadWithLoading(() => import("../pages"));
const Error404 = dynamicLoadWithLoading(() =>
  import("../pages/error/Error404")
);
const Error500 = dynamicLoadWithLoading(() =>
  import("../pages/error/Error500")
);

export interface IBasicLayout extends RouteProps {
  isMobile: boolean;
}

const { Content } = Layout;
const contentStyle = layoutConfig.header.fixed ? {} : { paddingTop: 0 };

const BasicLayout: React.FC<IBasicLayout> = (props: IBasicLayout) => {
  const actions = useActions({ changeIsMobile });

  const { isMobile } = props;

  useEffect(() => {
    actions.changeIsMobile(isMobile);
  }, [isMobile, actions]);

  useOnMount(() => {
    updateIsAuthenticationCheckBlocked(false);
  });

  useOnUnmount(() => {
    Modal.destroyAll();
  });

  const routes = useParseMenuConfigToRoutes();
  return (
    <>
      <ContainerQuery query={query}>
        {params => (
          <div className={className(params)}>
            <Layout className={styles.basicLayout}>
              {layoutConfig.siderMenu.show && <Sider />}
              <Layout>
                {layoutConfig.header && layoutConfig.header.show && <Header />}
                <Content className={styles.content} style={contentStyle}>
                  <Switch>
                    <Route
                      path={`${basePath}` || "/"}
                      exact={true}
                      component={Home}
                    />
                    {routes}
                    <Route
                      path={`${basePath}/404`}
                      exact={true}
                      component={Error404}
                    />
                    <Route
                      path={`${basePath}/500`}
                      exact={true}
                      component={Error500}
                    />
                    <Route component={Redirect} />
                  </Switch>
                </Content>
                {layoutConfig.footer && layoutConfig.footer.show && <Footer />}
              </Layout>
            </Layout>
          </div>
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
