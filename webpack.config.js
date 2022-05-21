const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/** 
* @type {import('webpack').Configuration}
*/
const webpackConfig = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    clean: true,
    publicPath: "/webgl-playground/"
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
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      { 
        test: /\.(glsl|vert|frag)$/,
        type: 'asset/source',
      },
    ],
  }
}

module.exports = webpackConfig
