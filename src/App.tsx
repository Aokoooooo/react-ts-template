import React from "react";
import { Provider } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import history from "./config/history";
import store from "./config/store";
import HelloWord from "./pages/HelloWorld";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path="/" exact={true} component={HelloWord} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
