const webpack = require('webpack');

module.exports = {
  entry: './assets/js/src/index.js',
  output: {
    filename: 'bundle.js',
    path: './assets/js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      }
    ]
  },
  devtool: '#source-map',
  plugins: [
    // new webpack.optimize.UglifyJsPlugin()
  ]
}