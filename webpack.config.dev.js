const path = require('path');
const webpack = require('webpack');

const currentEnv = JSON.stringify(process.env.NODE_ENV || 'development');

module.exports = {
  externals: {
    'react/addons':                   true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext':         true,
  },
  entry: {
    app:    ['babel-polyfill', path.join(__dirname, './index.js')],
    vendor: ['react', 'react-dom'],
  },
  module: {
    loaders: [
      {
        test:   /\.js$/,
        loader: 'babel-loader',
        query:  { cacheDirectory: true },
      },
      {
        test:   /\.(gif|jpe?g|png|svg)$/,
        loader: 'url-loader',
        query:  { name: '[name].[hash:16].[ext]' },
      },
    ],
  },
  output: {
    filename: '[name].js',
    path:     path.join(__dirname, './build/'),
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': currentEnv }),
  ],
  resolve: {
    extensions: ['.jsx', '.js'],
  },
};
