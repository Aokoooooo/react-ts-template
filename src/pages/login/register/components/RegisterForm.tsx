import { Form, Input } from "antd";
import { FormComponentProps } from "antd/lib/form";
import React from "react";

class RegisterForm extends React.PureComponent<FormComponentProps> {
  public handleSubmit = () => {
    const { form } = this.props;
    form.validateFields(err => {
      if (!err) {
        console.log("submit");
      }
    });
  };

  public render() {
    const { form } = this.props;

    const passwordConfirmValidator = (
      rule: any,
      value: string,
      callback: any
    ) => {
      const password = this.props.form.getFieldValue("password");
      if (password === value) {
        callback();
      } else {
        callback("两次密码输入必须相同");
      }
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item hasFeedback={true}>
          {form.getFieldDecorator("account", {
            rules: [
              {
                required: true,
                message: "账户名不可为空"
              }
            ]
          })(<Input placeholder="账户名" />)}
        </Form.Item>
        <Form.Item hasFeedback={true}>
          {form.getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "密码不可为空"
              }
            ]
          })(<Input.Password placeholder="密码" />)}
        </Form.Item>
        <Form.Item hasFeedback={true}>
          {form.getFieldDecorator("passwordConfirm", {
            rules: [
              {
                required: true,
                message: "确认密码不可为空"
              },
              {
                validator: passwordConfirmValidator
              }
            ],
            validateFirst: true
          })(<Input.Password placeholder="确认密码" />)}
        </Form.Item>
      </Form>
    );
  }
}
export default Form.create({ name: "registerForm" })(RegisterForm);
