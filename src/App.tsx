import { ConfigProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import React from "react";
import { Provider } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import history from "./config/history";
import store from "./config/store";
import { basePath } from "./config/systemParams";
import { dynamicLoadWithLoading } from "./utils";

moment.locale("zh-cn");

const BasicLayout = dynamicLoadWithLoading(
  () => import("./layouts/BasicLayout"),
  <div />
);
const Login = dynamicLoadWithLoading(
  () => import("./pages/auth/login"),
  <div />
);
const Register = dynamicLoadWithLoading(
  () => import("./pages/auth/register"),
  <div />
);
const ForgetPassword = dynamicLoadWithLoading(
  () => import("./pages/auth/ForgetPassword"),
  <div />
);

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zh_CN}>
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path={`${basePath}/login`} exact={true} component={Login} />
            <Route
              path={`${basePath}/register`}
              exact={true}
              component={Register}
            />
            <Route
              path={`${basePath}/forgetPassword`}
              exact={true}
              component={ForgetPassword}
            />
            <Route path={`${basePath}/`} component={BasicLayout} />
          </Switch>
        </Router>
      </Provider>
    </ConfigProvider>
  );
};

export default App;
