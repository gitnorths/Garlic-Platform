/**
 * api接口统一管理
 */
import axios from './axios';

// 用户接口
function postUserApi(action, data) {
  return axios.post(`/garlic-web-api/${action}`, data);
}

// 基础接口
function getBaseApi(action, params = {}) {
  return axios.get(`/garlic-web-api/${action}`, { params });
}
function postBaseApi(action, data = {}) {
  return axios.post(`/garlic-web-api/${action}`, data);
}

export { postUserApi, getBaseApi, postBaseApi };
