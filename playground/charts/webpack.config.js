const path = require('path')

module.exports = {
  mode: 'development',
  devServer: {
    port: 8333,
    static: '.',
  },
  entry: './src/index.ts',
  output: {
    // library: 'mmp',
    // libraryTarget: 'umd',
    filename: 'bundle.js',
    // globalObject: 'this',
    path: path.resolve(__dirname, 'dist'),
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
}
