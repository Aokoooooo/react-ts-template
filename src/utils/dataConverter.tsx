import { Descriptions, Select } from "antd";
import { get } from "lodash";
import moment from "moment";

export const reformatDate = (
  date: string | undefined | null | number | Date,
  formatter: string = "YYYY-MM-DD",
  parseFormatter?: string
) => {
  if (!date) {
    return "";
  }
  // CST在转换为中国时间时,经常会被程序认为是美国东部时间(同名)从而造成时差,所以去掉它
  if (typeof date === "string" && date.indexOf("CST ") !== -1) {
    date = date.replace("CST ", "");
    date = new Date(date);
  }
  return moment(date, parseFormatter).format(formatter);
};

export interface IConstants {
  [key: string]: string | number;
}
export const convertConstantsToSelectOptions = (
  constant: IConstants,
  customFilter?: ((key: string) => boolean) | string[] | string
) => {
  let keys = Object.keys(constant);
  if (typeof customFilter === "function") {
    keys = keys.filter(customFilter);
  } else if (Array.isArray(customFilter)) {
    keys = keys.filter(i => !customFilter.includes(i));
  } else if (typeof customFilter === "string") {
    keys = keys.filter(i => i !== customFilter);
  }
  return keys.map(i => {
    return (
      <Select.Option key={i} value={i}>
        {constant[i]}
      </Select.Option>
    );
  });
};

export const getConstantNameByValue = (
  constant: IConstants,
  key: number | string,
  defaultValue: string = ""
) => {
  if (typeof key === "number") {
    key = String(key);
  }
  if (!key) {
    return defaultValue;
  }
  return constant[key] || "未知数据";
};

export interface IDescriptionConfig {
  label: string;
  key: string;
  render?: (data: object) => string | number;
  [other: string]: any;
}
export const convertDataToDescriptions = (
  config: IDescriptionConfig | IDescriptionConfig[],
  data: object
) => {
  const getValue = (
    key: string,
    render?: (data: object) => string | number
  ) => {
    if (render) {
      return render(data);
    }
    return get(data, key, "");
  };
  if (Array.isArray(config)) {
    let reactListItemKey = 0;
    return config.map(i => {
      const { label, key, render, ...rest } = i;
      return (
        <Descriptions.Item key={reactListItemKey++} label={label} {...rest}>
          <span>{getValue(key, render)}</span>
        </Descriptions.Item>
      );
    });
  }
  const { label, key, render, ...rest } = config;
  return (
    <Descriptions.Item label={label} {...rest}>
      <span>{getValue(key, render)}</span>
    </Descriptions.Item>
  );
};
