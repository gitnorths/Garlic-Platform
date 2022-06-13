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

// 配方接口
// https://garlic.chinanoni.com/suan-api/noni/gongmi/suan
function getSuanApi(action, params = {}) {
  return axios.get(`/suan-api/${action}`, { params });
}

export { getSuanApi, getBaseApi, postUserApi, postBaseApi };
