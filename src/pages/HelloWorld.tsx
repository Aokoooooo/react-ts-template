import { Button } from "antd";
import React from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router";
import { Action, Reducer } from "redux";
import { Epic } from "redux-observable";
import { filter, mapTo } from "rxjs/operators";
import history from "../config/history";
import withAuthority from "../containers/WithAuthority";
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
  public s: string = "f";
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    console.log("hello");
    console.log(this.props);
  }

  @bind
  public test(e: React.MouseEvent) {
    history.goBack();
  }

  public go404 = () => {
    history.push("/404");
  };

  public render() {
    // console.log(styles);
    return (
      <div>
        <h1 className={styles.red}>hello</h1>
        <Button onClick={this.test}>test</Button>
        <Button onClick={this.go404}>go 404</Button>
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
