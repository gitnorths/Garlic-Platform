import Vue from 'vue';
import store from './store';
import App from './App.vue';
import dataV from '@jiaminghi/data-view';
import router from './router';
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import './registerServiceWorker';
import './assets/style/reset.scss';
import './assets/style/index.scss';

import * as api from '@/api';
Vue.prototype.$api = api;
Vue.prototype.$bus = new Vue();

// AmapVue.config.key = 'ddd292c88aa1bad9c04891a47724f40a';

import AmapVue from '@amap/amap-vue';

AmapVue.config.key = 'ddd292c88aa1bad9c04891a47724f40a';
Vue.use(AmapVue);

Vue.use(ElementUI);

import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts;

import dayjs from 'dayjs';
Vue.prototype.$dayjs = dayjs; // 全局使用dayjs

import videojs from 'video.js';
import 'video.js/dist/video-js.css';
Vue.prototype.$VideoJs = videojs;

import Axios from 'axios';
Vue.prototype.$axios = Axios;

Vue.config.productionTip = false;

Vue.use(dataV);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
