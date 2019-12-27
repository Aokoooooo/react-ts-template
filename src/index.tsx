import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.less";
import * as serviceWorker from "./serviceWorker";
require("es5-shim");
require("es5-shim/es5-sham");
require("console-polyfill");
require("core-js");
require("es6-promise").polyfill();
require("fetch-ie8");

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
