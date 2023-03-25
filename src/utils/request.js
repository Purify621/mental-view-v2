import axios from "axios";
import store from "@/store";
import { Message } from "element-ui";
import { getToken } from "@/utils/auth";

// 创建一个axios实例
const service = axios.create({
  baseURL: "http://localhost:8080/", // url = base url + request url
  // withCredentials: true, // 当跨域请求时发送cookie
  timeout: 5000, // 请求超时
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做一些事情
    if (store.getters.token) {
      // 每次请求先携带token
      config.headers["token"] = getToken();
    }
    return config;
  },
  (error) => {
    // 处理请求错误
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  // 解析一层 data
  (response) => {
    const res = response.data;
    // 状态码不对的情况下的提示信息 响应拦截器在此处已经判断，因此在其它页面请求时无需在对状态码进行判断
    if (res.code !== 200) {
      Message({
        message: "请求出错了！",
        type: "error",
        duration: 5 * 1000,
      });
      /*
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm(
          "您已经登出, 您可以取消留在此页面, 或重新登录",
          "确认注销",
          {
            confirmButtonText: "Re-Login",
            cancelButtonText: "Cancel",
            type: "warning",
          }
        ).then(() => {
          store.dispatch("user/resetToken").then(() => {
            location.reload();
          });
        });
      }
      */
      // return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res;
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    /*
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    */
    return Promise.reject(error);
  }
);

export default service;
