import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    // config.headers.Authorization = window.sessionStorage.getItem('token')
    return config;
  },
  (error) => {
    return Promise.error(error);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
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
