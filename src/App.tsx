import { LocaleProvider } from "antd";
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

const BasicLayout = dynamicLoadWithLoading(() =>
  import("./layouts/BasicLayout")
);
const LoginLayout = dynamicLoadWithLoading(() =>
  import("./layouts/LoginLayout")
);

const App: React.FC = () => {
  return (
    <LocaleProvider locale={zh_CN}>
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route
              path={`${basePath}/login`}
              exact={true}
              component={LoginLayout}
            />
            <Route
              path={`${basePath}/register`}
              exact={true}
              component={LoginLayout}
            />
            <Route
              path={`${basePath}/forgetPassword`}
              exact={true}
              component={LoginLayout}
            />
            <Route path={`${basePath}/`} component={BasicLayout} />
          </Switch>
        </Router>
      </Provider>
    </LocaleProvider>
  );
};

export default App;
