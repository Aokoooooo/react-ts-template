import { Button, Checkbox, Tabs } from "antd";
import React, { useRef, useState } from "react";
import history from "../../../config/history";
import {
  bindFormRef,
  FormComponent,
  validateFormFields
} from "../../../utils/form";
import AccountLoginForm from "./components/AccountLoginForm";
import styles from "./index.module.less";

const Login: React.FC = () => {
  const [autoLogin, setAutoLogin] = useState(true);
  const accountLoginForm = useRef<FormComponent>(null);

  const handleAutoLoginChange = (): void => {
    setAutoLogin(!autoLogin);
  };

  const handleSubmit = () => {
    validateFormFields(accountLoginForm, () => {
      console.log("sumbit");
    });
  };

  const handleSignupClick = () => {
    history.push("/register");
  };

  const handleForgetPasswordClick = () => {
    history.push("/forgetPassword");
  };

  return (
    <div className={styles.main}>
      <Tabs className={styles.tabs} defaultActiveKey={"1"}>
        <Tabs.TabPane tab="登录" key="1">
          <AccountLoginForm
            wrappedComponentRef={(inst: FormComponent) =>
              bindFormRef(inst, accountLoginForm)
            }
          />
        </Tabs.TabPane>
      </Tabs>
      <div>
        <Checkbox checked={autoLogin} onChange={handleAutoLoginChange}>
          记住我
        </Checkbox>
        <p style={{ float: "right" }} onClick={handleForgetPasswordClick}>
          忘记密码
        </p>
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
