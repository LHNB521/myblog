const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: 'production',
  devtool: 'eval-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin(),
    new CssMinimizerWebpackPlugin()
  ]
});
