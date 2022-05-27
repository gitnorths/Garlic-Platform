import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

Vue.use(Vuex);
const moduleFiles = require.context('./modules', true, /\.js$/);
const modules = moduleFiles.keys().reduce((moduleMap, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const moduleValue = moduleFiles(modulePath);
  moduleMap[moduleName] = moduleValue.default;
  return moduleMap;
}, {});

const store = new Vuex.Store({
  strict: false,
  modules,
  getters,
});

export default store;
