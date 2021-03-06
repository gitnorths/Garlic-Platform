import Vue from 'vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import dataV from '@jiaminghi/data-view';

import './assets/style/reset.scss';
import './assets/style/index.scss';

// AmapVue.config.key = 'ddd292c88aa1bad9c04891a47724f40a';

import AmapVue from '@amap/amap-vue';

AmapVue.config.key = 'ddd292c88aa1bad9c04891a47724f40a';
Vue.use(AmapVue);

Vue.use(ElementUI);

import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;

Vue.use(dataV);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
