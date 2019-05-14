import { Button, Col, Form, Input, Row } from "antd";
import { FormComponentProps } from "antd/lib/form";
import React from "react";

const checkRules = {
  phoneNumber: [
    {
      required: true,
      message: "手机号不可为空"
    }
  ],
  code: [
    {
      required: true,
      message: "验证码不可为空"
    }
  ]
};
class PhoneNumberLoginForm extends React.PureComponent<FormComponentProps> {
  public handleSubmit = () => {
    const { form } = this.props;
    form.validateFields(err => {
      if (!err) {
        console.log("submit");
      }
    });
  };

  public getVerificationCode = () => {
    console.log("get verification code");
  };

  public render() {
    const { form } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item hasFeedback={true}>
          {form.getFieldDecorator("phoneNumber", {
            rules: [...checkRules.phoneNumber]
          })(<Input placeholder="手机号" />)}
        </Form.Item>
        <Form.Item hasFeedback={true}>
          <Row type="flex" justify="space-between">
            <Col span={16}>
              {form.getFieldDecorator("code", {
                rules: [...checkRules.code]
              })(<Input placeholder="验证码" />)}
            </Col>
            <Col span={8}>
              <Button onClick={this.getVerificationCode}>获取验证码</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    );
  }
}
export default Form.create({ name: "phoneNumberLoginForm" })(
  PhoneNumberLoginForm
);
