const { DefinePlugin } = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {ModuleFederationPlugin} = require("webpack").container;
const commonConfig = require('./webpack.common');
const deps = require('../package.json').dependencies;

const PORT = 3000;

const localConfig = {
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
    historyApiFallback: { index: '/', disableDotRule: true },
    static: __dirname + "/public/",
  },
  target: 'web',
  module: {
    rules: []
  },
  stats: 'errors-warnings',
  plugins: [
    new DefinePlugin({
      CONTAINER_SERVICE_URL: JSON.stringify('http://localhost:8080'),
      AUTH_SERVICE_URL: JSON.stringify('http://localhost:8081'),
      CONTAINER_API: '/api/container/v1',
      AUTH_API: '/api/auth/v1'
    }),
    new HtmlWebpackPlugin({
      title: 'TODO Application Container',
      template: './public/index.html',
      inject: true
    }),
    new ModuleFederationPlugin({
      name: 'container',
      library: { type: 'var', name: 'container' },
      shared: {
        ...deps,
        react: { singleton: true, eager: true, requiredVersion: deps.react },
        "react-dom": { singleton: true, eager: true, requiredVersion: deps["react-dom"] },
      },    
    })
  ]
};

module.exports = merge(commonConfig, localConfig);
