const path = require('path');

const resolve = (dir) => {
  return path.join(__dirname, dir);
}

module.exports = {
  lintOnSave: false,
  devServer: {
    open: true,
    host: "localhost",
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      // 配置跨域
      "/api": {
        //要访问的跨域的api的域名
        target: "http://localhost:3000/api/",
        ws: true,
        changOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    },
    before: app => {}
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('styles', resolve('src/assets/styles'))
  }
};
