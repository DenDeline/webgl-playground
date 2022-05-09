const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/** 
* @type {import('webpack').Configuration}
*/
const webpackConfig = {
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  devServer: {
    hot: true
  },
  mode: 'development',
  module: {
  	rules: [
      { test: /\.(html)$/, use: ['html-loader'] },
      { test: /\.(glsl|vert|frag)$/, type: 'asset/source', },
    ],
  }
}

module.exports = webpackConfig
