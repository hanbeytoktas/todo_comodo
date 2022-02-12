const { DefinePlugin } = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');
const TerserPlugin = require("terser-webpack-plugin");

const PORT = 3000;

const prodConfig = {
  mode: 'development',
  devtool: 'source-map',
  output: {
    publicPath: `http://localhost:${PORT}/`
  },
  devServer: {
    port: PORT,
    liveReload: true,
    open: true,
    hot: true,
    historyApiFallback: { index: '/', disableDotRule: true }
  },
  optimization: {
    minimize: false,
    minimizer: [new TerserPlugin()],
  },
  target: 'web',
  module: {
    rules: []
  },
  plugins: [
    new DefinePlugin({
      CONTAINER_SERVICE_URL: JSON.stringify('http://localhost:8080'),
      AUTH_SERVICE_URL: JSON.stringify('http://localhost:8081'),
      CONTAINER_API: '/api/container/v1',
      AUTH_API: '/api/auth/v1'
    }),
    new HtmlWebpackPlugin({
      title: 'SD-DC LOCAL - Software Defined Data Center',
      template: './public/index.html',
      inject: true
    })
  ]
};

module.exports = merge(commonConfig, prodConfig);
