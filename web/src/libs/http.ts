import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import store from "@/store/index";
import { ATS } from "@/store/actionTypes";
import config from "@/config";
import $message from "@/components/Message";

class HttpRequest {
  baseURL: string;

  constructor(baseURL: string) {
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

  interceptors(instance: AxiosInstance) {
    instance.interceptors.request.use(
      (config) => {
        store.commit(ATS.SET_LOADING, true);
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
        store.commit(ATS.SET_LOADING, false);
        return res;
      },
      (err) => {
        let message = "";

        if (
          err.code === "ECONNABORTED" &&
          err.message.indexOf("timeout") !== -1
        ) {
          message = "请求超时";
        } else if (err.response) {
          message = err.response.data.message || err.response.data;
        }

        store.commit(ATS.SET_LOADING, false);
        $message({
          type: "error",
          message,
        });

        return Promise.reject(err);
      }
    );
  }

  /**
   * 请求入口
   */

  request(options: AxiosRequestConfig) {
    const instance = axios.create();
    options = Object.assign({}, this.getInsideConfig(), options);
    this.interceptors(instance);
    return instance(options);
  }

  /**
   * 封装get,post,patch,delete方法
   */

  get(options: AxiosRequestConfig) {
    return this.request({
      method: "get",
      url: options.url,
      params: options.params,
    });
  }

  post(options: AxiosRequestConfig) {
    return this.request({
      method: "post",
      url: options.url,
      data: options.data,
      headers: options.headers,
    });
  }

  patch(options: AxiosRequestConfig) {
    return this.request({
      method: "patch",
      url: options.url,
      data: options.data,
    });
  }

  delete(options: AxiosRequestConfig) {
    return this.request({
      method: "delete",
      url: options.url,
    });
  }
}

const baseURL =
  process.env.NODE_ENV === "development"
    ? config.baseURL.dev
    : config.baseURL.pro;

export default new HttpRequest(baseURL);
