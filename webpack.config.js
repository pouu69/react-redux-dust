// webpack.config.js

const webpack = require('webpack')
const path = require('path')

console.log(process.env.NODE_ENV);
const extractCommons = new webpack.optimize.CommonsChunkPlugin({
  name: 'commons',
  filename: 'common.js'
})

let entry = [
    'babel-polyfill',
    'whatwg-fetch',
    './index'
];

const config = {
  devtool: 'source-map',
  context: path.resolve(__dirname, 'src'),
  entry: entry,
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
    extractCommons,
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': `"production"`
        }
    })
  ]

}

module.exports = config
