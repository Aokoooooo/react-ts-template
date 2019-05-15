import axios from "axios";

const BASE_URL = process.env.NODE_ENV === "production" ? "" : "";
const TOKEN = "test";
const instance = axios.create({
  baseURL: BASE_URL
});

instance.defaults.headers.common.Authorization = TOKEN;

instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
