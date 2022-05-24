const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
const webpack = require('webpack');
const path = require('path')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')

const workspaceRoot = path.resolve(__dirname, './')

module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        hot: true,
        historyApiFallback: true,
        port: 8088,
        open: true,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          template: './public/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
})
