import { Button } from "antd";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Action, Reducer } from "redux";
import { Epic } from "redux-observable";
import { filter, mapTo } from "rxjs/operators";
import axios from "../config/axios";
import history from "../config/history";
import { bind, withEpic, withReducer } from "../utils/decorators";
import styles from "./HelloWorld.module.less";

function reducer(state: any = {}, action: Action): Reducer {
  switch (action.type) {
    default:
      return state;
  }
}
const epic: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === "PING"),
    mapTo({ type: "PONG" })
  );

@withEpic("hello", epic)
@withReducer("hello", reducer)
// // @withAuthority(['admin'])
@(withRouter as any)
@(connect((state: any) => ({ a: state })) as any)
export default class HelloWord extends React.Component {
  public componentDidMount() {
    console.log("hello");
  }

  @bind
  public goBack(e: React.MouseEvent) {
    history.goBack();
  }

  public goto404 = () => {
    history.push("/404");
  };

  public gotoLogin = () => {
    history.push("/login");
  };

  public testRequest = () => {
    axios
      .get("/")
      .then(r => console.log(r))
      .catch(e => console.log(e));
  };

  public render() {
    return (
      <div>
        <h1 className={styles.red}>hello</h1>
        <Button onClick={this.goBack}>goBack</Button>
        <Button onClick={this.goto404}>goto 404</Button>
        <Button onClick={this.gotoLogin}>goto login</Button>
        <Button onClick={this.testRequest}>testRequest</Button>
        <h1 className={styles.red}>hello</h1>
        <h1 className={styles.red}>hello</h1>
        <h1 className={styles.red}>hello</h1>
        <h1 className={styles.red}>hello</h1>
        <h1 className={styles.red}>hello</h1>
        <h1 className={styles.red}>hello</h1>
        <h1 className={styles.red}>hello</h1>
        <h1 className={styles.red}>hello</h1>
        <h1 className={styles.red}>hello</h1>
        <h1 className={styles.red}>hello</h1>
        <h1 className={styles.red}>hello</h1>
        <h1 className={styles.red}>hello</h1>
        <h1 className={styles.red}>hello</h1>
        <h1 className={styles.red}>hello</h1>
        <h1 className={styles.red}>hello</h1>
        <h1 className={styles.red}>hello</h1>
        <h1 className={styles.red}>hello</h1>
        <h1 className={styles.red}>hello</h1>
        <h1 className={styles.red}>hello</h1>
        <h1 className={styles.red}>hello</h1>
        <h1 className={styles.red}>hello</h1>
        <h1 className={styles.red}>hello</h1>
        <h1 className={styles.red}>hello</h1>
      </div>
    );
  }
}
