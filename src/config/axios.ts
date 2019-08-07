import { message } from "antd";
import axios from "axios";
import { changeSpining } from "../layouts/store/layoutAction";
import history from "./history";
import store from "./store";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_BASE_URL
    : `${process.env.REACT_APP_DEV_BASE_URL}/api`;

export const TOKEN_STORAGE_NAME = "token";
const TOKEN_HEADER_NAME = "Authorization";

const instance = axios.create({
  baseURL: BASE_URL
});

let loadingCount = 0;

const changeLoadingState = () => {
  store.dispatch(changeSpining());
};
const addLoading = () => {
  if (loadingCount === 0) {
    changeLoadingState();
  }
  loadingCount++;
};

const subtractLoading = () => {
  loadingCount--;
  if (loadingCount === 0) {
    changeLoadingState();
  }
};

instance.interceptors.request.use(
  config => {
    config.headers[TOKEN_HEADER_NAME] = `${localStorage[TOKEN_STORAGE_NAME]}`;
    addLoading();
    return config;
  },
  error => {
    subtractLoading();
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    subtractLoading();
    return response;
  },
  error => {
    subtractLoading();
    const status = error.response && error.response.status;
    if (status === 401) {
      history.push("/login");
      message.error("请重新登录");
    } else if (status === 403) {
      message.error("没有权限进行此操作");
    } else if (status === 404) {
      history.replace("/404");
    } else if (status === 500) {
      history.replace("/500");
    } else if (status > 300) {
      history.replace("/500");
    } else {
      console.log(error);
      // message.error(error);
    }
    return Promise.reject(error);
  }
);

export default instance;
