const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { SERVER_HOST, SERVER_PORT } = require('../constants');
const { data } = require('./data.js');
const devServer = {
  host: SERVER_HOST, // 指定 host，不设置的话默认是 localhost
  port: SERVER_PORT, // 指定端口，默认是8080
  compress: true, // 是否启用 gzip 压缩
  open: false, // 打开默认浏览器
  hot: true, // 热更新
  historyApiFallback: true,
  client: {
    logging: 'error', // 只打印报错，其实只要这个配置就好了
    overlay: {
      // 有报错发生，直接覆盖浏览器视窗，显示错误
      errors: true,
      warnings: false
    }
  }
};
module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new CssMinimizerWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin({
      // 成功的时候输出
      compilationSuccessInfo: {
        // notes: [data + devServer.port]
        messages: [data, 'http://localhost:' + devServer.port]
      },
      // 是否每次都清空控制台
      clearConsole: true
    })
  ],
  devServer
});
