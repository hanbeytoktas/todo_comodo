const { DefinePlugin } = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const commonConfig = require('./webpack.common');
const deps = require('../package.json').dependencies;

const PORT = 3001;

const localConfig = {
  mode: 'development',
  devtool: 'source-map',
  output: {    
    publicPath: `http://localhost:${PORT}/`,
    clean: true,
  },
  cache: false,
  devServer: {
    port: PORT,
    liveReload: true,
    open: true,
    hot: true

  },
  cache: false,
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
      title: 'TODO Application Plugin1',
      template: './public/index.html',
      inject: true
    }),
    new ModuleFederationPlugin({
      name: "plugin1",
      filename: "remoteEntry.js",
      library: { type: 'var', name: 'plugin1' },
      exposes: {
        './module1': './src/App'
      },   
      shared: {
        ...deps,
        react: { singleton: true, eager: true, requiredVersion: deps.react },
        "react-dom": { singleton: true, eager: true, requiredVersion: deps["react-dom"] }
      },  
    }),    
  ]
};

module.exports = merge(commonConfig, localConfig);
