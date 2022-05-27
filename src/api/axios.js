// 引入
import qs from 'qs';
import axios from 'axios';
import store from '@/store';
import { baseUrl } from '@/config';
import { Message } from 'element-ui';

// 环境
const request = axios.create({
  baseURL: baseUrl,
  timeout: 30000,
  withCredentials: false,
  paramsSerializer: (params) => qs.stringify(params),
});

request.interceptors.request.use(
  (config) => {
    config.headers['deviceId'] = 'bXV3dS1jbGllbnQtYXV0aDptdXd1Q2xpZW50U2VjcmV0';
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    config.headers['Authorization'] = `Basic bXV3dS1jbGllbnQtYXV0aDptdXd1Q2xpZW50U2VjcmV0`;

    const token = store.getters.token;
    console.log(token);
    if (token) {
      config.headers['Authorization'] = `bearer ${token}`; // bXV3dS1jbGllbnQtYXV0aDptdXd1Q2xpZW50U2VjcmV0
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
request.interceptors.response.use(
  (response) => {
    // console.log(response);
    const { data } = response;

    if (!data.success && data.detail) {
      Message({
        type: 'error',
        message: data.detail,
      });
    }
    return Promise.resolve(data);
  },
  (error) => {
    const { response, message: errorMsg } = error;

    if (response.status === 401) {
      store.dispatch('user/resetToken');
      Message.error('登录过期, 请重新登录!');
    } else {
      Message({
        type: 'error',
        message: errorMsg,
      });
    }
    return Promise.reject(error);
  }
);

export default request;
