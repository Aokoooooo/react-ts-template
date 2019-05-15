import { Button } from "antd";
import React, { useState } from "react";
import history from "../../../config/history";
import RegisterForm from "./components/RegisterForm";
import styles from "./Register.module.less";

const Register: React.FC = () => {
  const [registerForm, setRegisterForm] = useState();

  const handleSubmit = () => {
    if (registerForm) {
      registerForm.handleSubmit();
    }
  };

  const handleLoginClick = () => {
    history.push("/login");
  };

  return (
    <div className={styles.main}>
      <h3>注册</h3>
      <div>
        <RegisterForm
          wrappedComponentRef={(inst: React.Component) => setRegisterForm(inst)}
        />
      </div>
      <Button className={styles.submit} type="primary" onClick={handleSubmit}>
        注册
      </Button>
      <p className={styles.login} onClick={handleLoginClick}>
        已有账号?
      </p>
    </div>
  );
};

export default Register;
