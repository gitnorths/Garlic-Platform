import Vue from 'vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import dataV from '@jiaminghi/data-view';
import BaiduMap from 'vue-baidu-map';

import './assets/style/reset.scss';
import './assets/style/index.scss';

Vue.use(ElementUI);
Vue.use(BaiduMap, {
  ak: 'w3bQcaIR8NQZuz4G0VKOboOHh8a5l8jG',
});

import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;

Vue.use(dataV);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
