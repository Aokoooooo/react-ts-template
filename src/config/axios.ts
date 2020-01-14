import { message } from "antd";
import axios from "axios";
import { get } from "lodash";
import { changeSpining } from "../layouts/store/";
import { gotoLogin } from "../utils";
import history from "./history";
import store from "./store";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_BASE_URL
    : `${window.location.origin}/api`;

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

let isAuthenticationCheckBlocked = false;
export const updateIsAuthenticationCheckBlocked = (newState: boolean) => {
  isAuthenticationCheckBlocked = newState;
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
    const status = Number(get(error, "response.status"));
    const errorMsg = get(error, "response.data.error");
    if (status === 401) {
      if (!isAuthenticationCheckBlocked) {
        updateIsAuthenticationCheckBlocked(true);
        gotoLogin();
        message.error("请重新登录");
      }
    } else if (status === 403) {
      message.error("没有权限进行此操作");
    } else if (status === 404) {
      history.replace("/404");
    } else if (status >= 500) {
      history.replace("/500");
    } else if (status > 300) {
      history.replace("/500");
    } else if (errorMsg) {
      message.error(error);
    } else {
      console.log(error);
    }
    return Promise.reject(error);
  }
);

export default instance;
