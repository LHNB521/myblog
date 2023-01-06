// process: 当前node进程
// process.env: 系统环境的信息
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';
const BASE_URL = isProduction
  ? 'http://43.155.69.178:8080'
  : 'http://localhost:8888';
module.exports = {
  isDevelopment,
  isProduction,
  BASE_URL
};
