import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { Moment } from "moment";
import React from "react";
import store from "../../../../config/store";
import { changeSearchForm } from "../store/";
import * as styles from "./HeaderSearchForm.module.less";
export interface ISearchForm {
  startDate: Moment | null;
  endDate: Moment | null;
  fundAttributes: string;
  accountNo: string;
  superviseNo: string;
  transferNo: string;
  payeeName: string;
}

export const initSearchForm: ISearchForm = {
  startDate: null,
  endDate: null,
  fundAttributes: "",
  accountNo: "",
  superviseNo: "",
  transferNo: "",
  payeeName: ""
};

class SearchForm extends React.PureComponent<FormComponentProps> {
  public render() {
    const { form } = this.props;
    return (
      <Form layout={"inline"} className={styles.form}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <Form.Item label={"起始日期"}>
              {form.getFieldDecorator("startDate")(
                <DatePicker
                  placeholder={"请选择起始日期"}
                  style={{ width: "100%" }}
                />
              )}
            </Form.Item>
          </Col>

          <Col md={8} sm={24}>
            <Form.Item label={"截止日期"}>
              {form.getFieldDecorator("endDate")(
                <DatePicker
                  placeholder={"请选择截止日期"}
                  style={{ width: "100%" }}
                />
              )}
            </Form.Item>
          </Col>

          <Col md={8} sm={24}>
            <Form.Item label={"资金属性"}>
              {form.getFieldDecorator("fundAttributes")(
                <Select
                  placeholder={"请选择资金属性"}
                  allowClear={true}
                  style={{ width: "100%" }}
                >
                  <Select.Option value="test">test</Select.Option>
                </Select>
              )}
            </Form.Item>
          </Col>

          <Col md={8} sm={24}>
            <Form.Item label={"收款账号"}>
              {form.getFieldDecorator("accountNo")(
                <Input placeholder={"请输入收款账号"} />
              )}
            </Form.Item>
          </Col>

          <Col md={8} sm={24}>
            <Form.Item label={"监管编号"}>
              {form.getFieldDecorator("superviseNo")(
                <Input placeholder={"请输入监管编号"} />
              )}
            </Form.Item>
          </Col>

          <Col md={8} sm={24}>
            <Form.Item label={"划款批次号"}>
              {form.getFieldDecorator("transferNo")(
                <Input placeholder={"请输入划款批次号"} />
              )}
            </Form.Item>
          </Col>

          <Col md={8} sm={24}>
            <Form.Item label={"收款人姓名"}>
              {form.getFieldDecorator("payeeName")(
                <Input placeholder={"请输入收款人姓名"} />
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

const handleFormValuesChange = (
  props: any,
  changedValues: any,
  allValues: ISearchForm
) => {
  store.dispatch(changeSearchForm(allValues));
};

export default Form.create({ onValuesChange: handleFormValuesChange })(
  SearchForm
);
