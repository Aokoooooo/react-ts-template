import loadable from "@loadable/component";
import { Icon } from "antd";
import React from "react";
import { Route, Switch } from "react-router";
import logo from "../assets/logo.svg";
import { layoutConfig } from "../config/layoutConfig";
import { ILinkConfig } from "./components/footer";
import BaseFooter from "./components/footer/BaseFooter";
import styles from "./LoginLayout.module.less";

const Login = loadable(() => import("../pages/login/Login"));
const Register = loadable(() => import("../pages/login/Register"));

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
        <div className={styles.top}>
          <div className={styles.header}>
            <img alt="logo" className={styles.logo} src={logo} />
            <span className={styles.title}>UserLayout</span>
          </div>
          <div className={styles.desc}>aoko</div>
        </div>

        <Switch>
          <Route path="/login" exact={true} component={Login} />
          <Route path="/register" exact={true} component={Register} />
        </Switch>
      </div>
      {layoutConfig.footer.show && (
        <BaseFooter links={footerLinks} copyright={`Copyright Aoko`} />
      )}
    </div>
  );
};

export default LoginLayout;
