import { Icon } from "antd";
import React from "react";
import { Route, Switch } from "react-router";
import { layoutConfig } from "../config/layoutConfig";
import { basePath } from "../config/systemParams";
import { dynamicLoadWithLoading } from "../utils";
import { ILinkConfig } from "./components/footer";
import BaseFooter from "./components/footer/BaseFooter";
import withLoading from "./components/Loading";
import styles from "./LoginLayout.module.less";

const Login = dynamicLoadWithLoading(() => import("../pages/auth/login"));
const Register = dynamicLoadWithLoading(() => import("../pages/auth/register"));
const ForgetPassword = dynamicLoadWithLoading(() =>
  import("../pages/auth/ForgetPassword")
);

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
