const merge = require('webpack-merge');
const path = require('path');

const paths = require('./paths');
const webpackConfigClientWeb = require('./webpack.config.client.web');

const config = {
  devtool: 'source-map',
  entry: {
    makeHtml: [
      path.resolve(paths.src, 'server/makeHtml.prod.tsx'),
    ],
  },
  mode: 'production',
  optimization: {
    minimize: false,
  },
  output: {
    filename: 'makeHtml.bundle.js',
    libraryTarget: 'commonjs2',
    path: paths.build,
    publicPath: '/moodsic/',
  },
  plugins: [
  ],
  target: 'node',
};

module.exports = merge(webpackConfigClientWeb, config);
