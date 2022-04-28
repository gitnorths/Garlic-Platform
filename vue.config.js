'use strict';
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = 'vue Admin Template';

const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    externals: {
      AMap: 'AMap',
    },
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
  },
});
