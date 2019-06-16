import { Button, Checkbox, Tabs } from "antd";
import React, { useState } from "react";
import history from "../../../config/history";
import AccountLoginForm from "./components/AccountLoginForm";
import styles from "./index.module.less";

const Login: React.FC = () => {
  const [autoLogin, setAutoLogin] = useState(true);
  const [key, setKey] = useState("1");
  const [accountLoginForm, setAccountLoginForm] = useState();

  const handleTabChange = (newKey: string): void => {
    setKey(newKey);
  };

  const handleAutoLoginChange = (): void => {
    setAutoLogin(!autoLogin);
  };

  const handleSubmit = () => {
    if (key === "1" && accountLoginForm) {
      accountLoginForm.handleSubmit();
    }
  };

  const handleSignupClick = () => {
    history.push("/register");
  };

  const handleForgetPasswordClick = () => {
    history.push("/forgetPassword");
  };

  return (
    <div className={styles.main}>
      <Tabs
        className={styles.tabs}
        defaultActiveKey={key}
        onChange={handleTabChange}
      >
        <Tabs.TabPane tab="登录" key="1">
          <AccountLoginForm
            wrappedComponentRef={(inst: React.Component) =>
              setAccountLoginForm(inst)
            }
          />
        </Tabs.TabPane>
      </Tabs>
      <div>
        <Checkbox checked={autoLogin} onChange={handleAutoLoginChange}>
          记住我
        </Checkbox>
        {key === "1" && (
          <p style={{ float: "right" }} onClick={handleForgetPasswordClick}>
            忘记密码
          </p>
        )}
      </div>
      <Button className={styles.button} type="primary" onClick={handleSubmit}>
        登录
      </Button>
      <div className={styles.other}>
        <p className={styles.register} onClick={handleSignupClick}>
          注册
        </p>
      </div>
    </div>
  );
};

export default Login;
