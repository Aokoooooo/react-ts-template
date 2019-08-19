import { Form, Input } from "antd";
import { FormComponentProps } from "antd/lib/form";
import React from "react";
const checkRules = {
  account: [
    {
      required: true,
      message: "账户名不可为空"
    }
  ],
  password: [
    {
      required: true,
      message: "密码不可为空"
    }
  ]
};

class AccountLoginForm extends React.PureComponent<FormComponentProps> {
  public render() {
    const { form } = this.props;
    return (
      <Form>
        <Form.Item hasFeedback={true}>
          {form.getFieldDecorator("account", {
            rules: [...checkRules.account]
          })(<Input placeholder="账户名" />)}
        </Form.Item>
        <Form.Item hasFeedback={true}>
          {form.getFieldDecorator("password", {
            rules: [...checkRules.password]
          })(<Input.Password placeholder="密码" />)}
        </Form.Item>
      </Form>
    );
  }
}
export default Form.create()(AccountLoginForm);
