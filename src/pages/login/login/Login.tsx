import { Button, Checkbox, Icon, Tabs } from "antd";
import React, { useState } from "react";
import history from "../../../config/history";
import AccountLoginForm from "./components/AccountLoginForm";
import PhoneNumberLoginForm from "./components/PhoneNumberLoginForm";
import styles from "./Login.module.less";

const Login: React.FC = () => {
  const [autoLogin, setAutoLogin] = useState(true);
  const [key, setKey] = useState("1");
  const [accountLoginForm, setAccountLoginForm] = useState();
  const [phoneNumberLoginForm, setPhoneNumberLoginForm] = useState();

  const handleTabChange = (newKey: string): void => {
    setKey(newKey);
  };

  const handleAutoLoginChange = (): void => {
    setAutoLogin(!autoLogin);
  };

  const handleSubmit = () => {
    if (key === "1" && accountLoginForm) {
      accountLoginForm.handleSubmit();
    } else if (key === "2" && phoneNumberLoginForm) {
      phoneNumberLoginForm.handleSubmit();
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
        <Tabs.TabPane tab="密码登录" key="1">
          <AccountLoginForm
            wrappedComponentRef={(inst: React.Component) =>
              setAccountLoginForm(inst)
            }
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="手机登录" key="2">
          <PhoneNumberLoginForm
            wrappedComponentRef={(inst: React.Component) =>
              setPhoneNumberLoginForm(inst)
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
        以其他方式登录
        <Icon type="github" className={styles.icon} theme="outlined" />
        <p className={styles.register} onClick={handleSignupClick}>
          注册
        </p>
      </div>
    </div>
  );
};

export default Login;
