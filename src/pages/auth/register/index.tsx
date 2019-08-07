import { Button } from "antd";
import React, { ReactNode, useRef } from "react";
import history from "../../../config/history";
import { bindFormRef } from "../../../utils";
import RegisterForm from "./components/RegisterForm";
import styles from "./index.module.less";

const Register: React.FC = () => {
  const registerForm = useRef<any>(null);

  const handleSubmit = () => {
    if (registerForm.current) {
      registerForm.current.handleSubmit();
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
          wrappedComponentRef={(inst: ReactNode) =>
            bindFormRef(inst, registerForm)
          }
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
