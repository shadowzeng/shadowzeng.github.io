const path = require('path')
const terser = require('terser-webpack-plugin')

module.exports = {
  mode: 'development',
  devServer: {
    port: 8080,
    static: '.',
  },
  entry: './index.ts',
  output: {
    filename: 'entry_bundle.js',
    path: path.resolve(__dirname, './'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  optimization: {
    minimize: false,
  },
  externals: {
    d3: 'd3',
  }
}
