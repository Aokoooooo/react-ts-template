import loadable from "@loadable/component";
import React from "react";
import { Provider } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import history from "./config/history";
import store from "./config/store";
import HelloWord from "./pages/HelloWorld";

const BasicLayout = loadable(() => import("./layouts/BaiscLayout"));

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path="/" component={BasicLayout} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
