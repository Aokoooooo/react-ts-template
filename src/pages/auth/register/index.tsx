import { Button } from "antd";
import React, { useRef } from "react";
import history from "../../../config/history";
import loginLayout from "../../../layouts/components/loginLayout";
import { gotoLogin } from "../../../utils";
import {
  bindFormRef,
  FormComponent,
  validateFormFields
} from "../../../utils/form";
import RegisterForm from "./components/RegisterForm";
import styles from "./index.module.less";

const Register: React.FC = () => {
  const registerForm = useRef<FormComponent>(null);

  const handleSubmit = () => {
    validateFormFields(registerForm, () => {
      console.log("submit");
    });
  };

  const handleLoginClick = () => {
    gotoLogin();
  };

  return (
    <div className={styles.main}>
      <h3>注册</h3>
      <div>
        <RegisterForm
          wrappedComponentRef={(inst: FormComponent) =>
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

export default loginLayout(Register);
