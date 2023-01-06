import axios from 'axios';
import {
  handleChangeRequestHeader,
  handleConfigureAuth,
  handleAuthError,
  handleGeneralError,
  handleNetworkError
} from './tools';
import { BASE_URL } from '../../scripts/env'
interface FcResponse<T> {
  errno: string;
  errmsg: string;
  data: T;
}
type Fn = (data: FcResponse<any>) => unknown;
interface IAnyObj {
  [index: string]: unknown;
}
const baseURL: string = BASE_URL;

// 默认请求超时时间
const timeout = 30000;
const service = axios.create({
  baseURL,
  timeout,
});
/**
 * @description: 请求拦截
 */
service.interceptors.request.use((config) => {
  let newConfig = config
  newConfig = handleChangeRequestHeader(config);
  newConfig = handleConfigureAuth(config);
  return newConfig;
});
/**
 * @description: 响应拦截
 */
service.interceptors.response.use(
  (response) => {
    if (response.status !== 200) return Promise.reject(response.data);
    handleAuthError(response.data.errno);
    handleGeneralError(response.data.errno, response.data.errmsg);
    return response;
  },
  (err) => {
    handleNetworkError(err.response.status);
    Promise.reject(err.response);
  }
);

/**
 * @description: get请求
 */
export const Get = <T>(
  url: string,
  params: IAnyObj = {},
  clearFn?: Fn
): Promise<[any, FcResponse<T> | undefined]> =>
  new Promise((resolve) => {
    service
      .get(url, { params })
      .then((result) => {
        let res: FcResponse<T>;
        if (clearFn !== undefined)
          res = clearFn(result.data) as unknown as FcResponse<T>;
        else res = result.data as FcResponse<T>;
        resolve([null, res as FcResponse<T>]);
      })
      .catch((err) => resolve([err, undefined]));
  });
/**
 * @description: post请求
 */
export const Post = <T>(
  url: string,
  data: IAnyObj,
  params: IAnyObj = {}
): Promise<[any, FcResponse<T> | undefined]> => {
  return new Promise((resolve) => {
    service
      .post(url, data, { params })
      .then((result) => resolve([null, result.data as FcResponse<T>]))
      .catch((err) => resolve([err, undefined]));
  });
};
