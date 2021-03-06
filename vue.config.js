'use strict';
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: './',
  transpileDependencies: true,
  configureWebpack: {
    externals: {
      AMap: 'AMap',
    },
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
  },
};
