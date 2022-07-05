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
    host: '127.0.0.1',
    port: 8084,
    open: true, // vue项目启动时自动打开浏览器
    // history模式下的url会请求到服务器端，但是服务器端并没有这一个资源文件，就会返回404，所以需要配置这一项
    historyApiFallback: {
      index: '/index.html', //与output的publicPath有关(HTMLplugin生成的html默认为index.html)
    },
    proxy: {
      '/baseUrl': {
        target: 'https://garlic.chinanoni.com', // 要跨域的域名
        ws: true,
        secure: false, // 如果是https接口，如要配置此参数
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          '^/baseUrl': '',
        },
      },
    },
  },
};
