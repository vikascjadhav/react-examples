
var path = require('path');
var webpack = require('webpack');
var BUILD_DIR = path.resolve(__dirname, 'app/build');
var APP_DIR = path.resolve(__dirname, 'app');
module.exports = {
  entry: APP_DIR+'/app.js',


  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },

  devtools: 'source-map',
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};
