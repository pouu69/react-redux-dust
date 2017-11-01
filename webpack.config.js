// webpack.config.js

const webpack = require('webpack')
const path = require('path')

const extractCommons = new webpack.optimize.CommonsChunkPlugin({
  name: 'commons',
  filename: 'common.js'
})

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('[name].bundle.css');

const config = {
  devtool: 'source-map',
  context: path.resolve(__dirname, 'src'),
  entry: [
    'whatwg-fetch',
    'babel-polyfill',
    './index'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: [{
          loader: 'babel-loader'
        }]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.(svg|png|jpg)$/,
        use: [{
          loader: 'url-loader',
          options: { limit: 10000 } // 10k 이하 이미지는 base64 문자열로 변환
        }]
      }
    ]
  },
  plugins: [
    extractCommons

  ]

}

module.exports = config
