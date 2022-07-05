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

// 图片接口
// https://pesapi.chinanoni.com/Api/pes/capture/day?BeginDate=2021-11-01&EndDate=2021-11-08&rows=20&page=1&encoderId=17&landid=
function getCaptureApi(params = {}) {
  return axios.get(`https://pesapi.chinanoni.com/Api/pes/capture/day/`, { params });
}

export { getSuanApi, getBaseApi, postUserApi, postBaseApi, getCaptureApi };
