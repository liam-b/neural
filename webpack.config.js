var path = require('path');
var webpack = require('webpack');
var jsonPackage = require('./package.json')

var config = {
  entry: {
    app: path.resolve(__dirname, './app/js/index.js'),
    vendor: Object.keys(jsonPackage.dependencies)
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: [/node_modules/], loader: 'babel-loader', query: { presets: ['es2015'] }}
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      children: true
    })
  ]
};

module.exports = config;