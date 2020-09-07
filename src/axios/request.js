import axios from "axios";
import { Message } from "element-ui";
import { getToken } from "../utils";

axios.interceptors.request.use(
  (config) => {
    // config.headers.Authorization = window.sessionStorage.getItem('token')
    return config;
  },
  (error) => {
    return Promise.error(error);
  }
);

// 200  成功  202  数据获取失败  203 用户信息验证失败 500 服务器错误  204 传入参数有误
// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      switch (response.data.msg) {
        case "202":
          Message.error("数据获取失败!");
          break;
        case "203":
          Message.error("用户信息验证失败!");
          window.sessionStorage.removeItem("token");
          getToken();
          break;
        case "204":
          Message.error("传入参数有误!");
          break;
        case "500":
          Message.error("服务器错误!");
          break;
        default:
      }
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axios;
