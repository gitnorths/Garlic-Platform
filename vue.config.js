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
  devServer: {
    open: true, // 配置是否自动启动浏览器
    // port: 8088, // 端口号
    https: false, // 是否使用https, https使用node的一个内部默认的ca证书
    proxy: 'https://garlic.chinanoni.com', // 配置跨域处理,只有一个代理
    // proxy: {
    //   '/api': {
    //     // target: 'https://garlic.chinanoni.com', // 要跨域的域名
    //     target: 'https://garlic.chinanoni.com',
    //     ws: true,
    //     secure: true, // 是否使用https, https使用node的一个内部默认的ca证书
    //     changeOrigin: true, // 允许跨域
    //     pathRewrite: {
    //       '^/api': '',
    //     },
    //   },
    // },
  },
};
