import axios from "axios";
import store from "../store/index";
import vm from "@/main";
import config from "../config/index";

class HttpRequest {
  constructor(baseURL = "") {
    this.baseURL = baseURL;
  }

  /**
   * 获取axios默认配置
   */

  getInsideConfig() {
    return {
      baseURL: this.baseURL,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      timeout: 10000,
    };
  }

  /**
   * 添加拦截器
   */

  interceptors(instance) {
    instance.interceptors.request.use(
      (config) => {
        if (store.state.token) {
          config.headers.Authorization = "Bearer " + store.state.token;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        vm.$message.error(err.response.data.message);
        return Promise.reject(err);
      }
    );
  }

  /**
   * axios请求
   */

  request(options) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance);
    return instance(options);
  }

  /**
   * 封装get,post,patch,delete请求方式
   */

  get(options) {
    return this.request({
      method: "get",
      url: options.url,
      params: options.params,
    });
  }

  post(options) {
    return this.request({
      method: "post",
      url: options.url,
      data: options.data,
    });
  }

  patch(options) {
    return this.request({
      method: "patch",
      url: options.url,
      data: options.data,
    });
  }

  delete(options) {
    return this.request({
      method: "delete",
      url: options.url,
    });
  }
}

const baseURL =
  process.env.NODE_ENV === "production"
    ? config.baseURL.pro
    : config.baseURL.dev;

export default new HttpRequest(baseURL);
