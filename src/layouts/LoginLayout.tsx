import loadable from "@loadable/component";
import { Icon } from "antd";
import React from "react";
import { Route, Switch } from "react-router";
import { layoutConfig } from "../config/layoutConfig";
import { ILinkConfig } from "./components/footer";
import BaseFooter from "./components/footer/BaseFooter";
import withLoading from "./components/Loading";
import styles from "./LoginLayout.module.less";

const Login = loadable(() => import("../pages/auth/login"));
const Register = loadable(() => import("../pages/auth/register"));
const ForgetPassword = loadable(() => import("../pages/auth/ForgetPassword"));

const footerLinks: ILinkConfig[] = [
  {
    key: "Aoko",
    title: <Icon type="github" />,
    href: "https://github.com/Aokoooooo/react-ts-template",
    blankTarget: true
  }
];

const LoginLayout: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Switch>
          <Route path="/login" exact={true} component={Login} />
          <Route path="/register" exact={true} component={Register} />
          <Route
            path="/forgetPassword"
            exact={true}
            component={ForgetPassword}
          />
        </Switch>
      </div>
      {layoutConfig.footer.show && (
        <span className={styles.footer}>
          <BaseFooter links={footerLinks} copyright={`Copyright Aoko`} />
        </span>
      )}
    </div>
  );
};

export default withLoading(LoginLayout);
