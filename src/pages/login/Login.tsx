import { Alert, Button, Checkbox, Icon, Input, Tabs } from "antd";
import React, { useState } from "react";
import history from "../../config/history";
import styles from "./Login.module.less";

const Login: React.FC = () => {
  const [autoLogin, setAutoLogin] = useState(true);
  const [key, setKey] = useState("1");

  const handleTabChange = (newKey: string): void => {
    setKey(newKey);
  };

  const handleAutoLoginChange = (): void => {
    setAutoLogin(!autoLogin);
  };

  const handleSubmit = () => {
    console.log("submit!!!");
  };

  const renderMessage = (content: any) => (
    <Alert
      style={{ marginBottom: 24 }}
      message={content}
      type="error"
      showIcon={true}
    />
  );

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
          <Input placeholder="账户名" />
          <Input.Password placeholder="密码" />
        </Tabs.TabPane>
        <Tabs.TabPane tab="手机登录" key="2">
          <Input placeholder="手机号" />
          <Input placeholder="验证码" />
        </Tabs.TabPane>
      </Tabs>
      <div className={styles.subContent}>
        <Checkbox checked={autoLogin} onChange={handleAutoLoginChange}>
          记住我
        </Checkbox>
        <a style={{ float: "right" }} onClick={handleForgetPasswordClick}>
          忘记密码
        </a>
      </div>
      <Button className={styles.button} type="primary" onClick={handleSubmit}>
        登录
      </Button>
      <div className={styles.other}>
        以其他方式登录
        <Icon type="github" className={styles.icon} theme="outlined" />
        <a className={styles.register} onClick={handleSignupClick}>
          注册
        </a>
      </div>
    </div>
  );
};

export default Login;
