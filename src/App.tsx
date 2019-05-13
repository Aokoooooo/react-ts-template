import loadable from "@loadable/component";
import React from "react";
import { Provider } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import history from "./config/history";
import store from "./config/store";

const BasicLayout = loadable(() => import("./layouts/BasicLayout"));
const LoginLayout = loadable(() => import("./layouts/LoginLayout"));

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path="/login" exact={true} component={LoginLayout} />
          <Route path="/register" exact={true} component={LoginLayout} />
          <Route path="/forgetPassword" exact={true} component={LoginLayout} />
          <Route path="/" component={BasicLayout} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
