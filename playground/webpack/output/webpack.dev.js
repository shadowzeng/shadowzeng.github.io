const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
const path = require('path')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')

const workspaceRoot = path.resolve(__dirname, './')

module.exports = merge(commonConfig, {
    mode: 'development',
    output: {
        path: path.resolve(workspaceRoot, './dist'),
        filename: '[name].js',
        publicPath: '/pub/' // 会在输出的html中有引入静态资源地址的位置加入该前缀
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          template: './src/index.html'
        }),
        new MiniCssExtractPlugin()
    ],
    devServer: {
        historyApiFallback: true,
        port: 8088,
    }
})
