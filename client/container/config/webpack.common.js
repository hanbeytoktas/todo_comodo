const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');


const PATHS = {
  public: path.join(__dirname, '../public'), // absolute path to RepoDir/src
  src: path.join(__dirname, '../src'), // absolute path to RepoDir/src
  dist: path.join(__dirname, '../dist') // absolute path to RepoDir/dist
};

module.exports = {
  entry: `${PATHS.src}/index.js`,
  output: {
    path: PATHS.dist,
    filename: '[name].[contenthash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(svg|woff|PNG|gif|png|jpe?g|woff2|ttf|eot|ico|otf)$/i,
        loader: 'file-loader',
        options: {
          // eslint-disable-next-line no-unused-vars
          name(resourcePath, resourceQuery) {
            if (process.env.NODE_ENV === 'development') return '[path][name].[ext]';

            return '[contenthash].[ext]';
          },
          outputPath: 'resources'
        }
      }
    ]
  },
  plugins: [
    new NodePolyfillPlugin(),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(PATHS.public, 'static'),
          to: path.resolve(PATHS.dist, 'static')
        }
      ],
      options: {
        concurrency: 100
      }
    })
  ]
};
