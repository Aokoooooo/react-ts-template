import loadable from "@loadable/component";
import { LocaleProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import React from "react";
import { Provider } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import history from "./config/history";
import store from "./config/store";

moment.locale("zh-cn");

const BasicLayout = loadable(() => import("./layouts/BasicLayout"));
const LoginLayout = loadable(() => import("./layouts/LoginLayout"));

const App: React.FC = () => {
  return (
    <LocaleProvider locale={zh_CN}>
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path="/login" exact={true} component={LoginLayout} />
            <Route path="/register" exact={true} component={LoginLayout} />
            <Route
              path="/forgetPassword"
              exact={true}
              component={LoginLayout}
            />
            <Route path="/" component={BasicLayout} />
          </Switch>
        </Router>
      </Provider>
    </LocaleProvider>
  );
};

export default App;
