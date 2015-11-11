var path = require('path');
var webpack = require('webpack');

module.exports.webpack = {

  watch: process.env.NODE_ENV == 'development',

  // default webpack config
  options: {
    devtool: 'eval',
    entry: [
      './assets/js',
    ],
    output: {
      path: path.resolve(__dirname, '.tmp/public/js'),
      filename: 'bundle.js'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    module: {
      loaders: [
        { test: /\.js$/, loaders: ['babel-loader?stage=0'], include: path.join(__dirname, 'src') },
        { test: /\.css$/, loader: 'style!css' }
      ]
    }
  },

  watchOptions: {

  }
}
