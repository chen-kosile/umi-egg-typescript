import Axios, { AxiosRequestConfig } from 'axios';
import router from 'umi/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { AXIOS_DEFAULT_CONFIG } from '@/config';
import { cookieUtil } from '@/utils/cookie';
import { message } from 'antd';

Axios.defaults.timeout = AXIOS_DEFAULT_CONFIG.tiemout;
Axios.defaults.baseURL = AXIOS_DEFAULT_CONFIG.baseURL;
Axios.defaults.withCredentials = AXIOS_DEFAULT_CONFIG.withCredentials

function requestSuccess(config: any): any {
  // 请求开始开启进度条
  NProgress.start();
  const cookie = cookieUtil.getCookie();
  if (cookie) {
    config.headers.Token = cookie;
  }
  return config;
}

function requestFail(error: any): any {
  return Promise.reject(error);
}

/**
 * 统一的接口的返回数据格式
 *  {
 *    data: any,
 *    statusCode: number,
 *    message: string
 *  }
 * @param response
 */

 function  responseSuccess(response: any): any {
  //  请求结束关闭进度条
   NProgress.done();
   return response;
 }

 function responseFail(error: any): any {
  //  请求失败， 关闭进度条
   NProgress.done();
   return Promise.reject(error);
 }

 // 添加拦截器

 Axios.interceptors.request.use(requestSuccess, requestFail);
 Axios.interceptors.response.use(responseSuccess, responseFail);

 /**
  * @param config
  */
export const request = (config: AxiosRequestConfig) => {
  return Axios(config)
    .then((response) => {
      const { data, statusCode, message } = response.data;
      return {
        data: data || {},
        statusCode,
        message
      }
    })
    .catch((error) => {
      if (!error.reponse) {
        return message.error('Error', error.message);
      }

      const statusCode = error.reponse.statusCode;

      if (statusCode === 401) {
        router.push('/user/login');
      }

      message.error(`【${config.method} ${config.url}】请求失败， 响应数据: %o`, error.reponse);
      
      return { statusCode, message: ''};
    });
}

export const Get = (
  url: string,
  params: object,
  config?: AxiosRequestConfig
) => {
  return request(
    Object.assign({}, config, {
      url: url,
      params: { ...params, _t: (new Date()).getTime()},
      method: 'get'
    })
  )
}

export const Post = (
  url: string,
  data?: object,
  config?: AxiosRequestConfig
) => {
  return request(
    Object.assign({}, config, {
      url: url,
      data: data,
      method: 'post'
    })
  )
}

export const Delete = (
  url: string,
  data?: object,
  config?: AxiosRequestConfig
) => {
  return request(
    Object.assign({}, config, {
      url: url,
      data: data,
      method: 'delete'
    })
  )
}