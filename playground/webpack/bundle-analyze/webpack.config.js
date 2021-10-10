const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const path = require('path')

const workspaceRoot = path.resolve(__dirname, './')

module.exports = {
    mode: 'production',
    entry: {
        main: './src/main.js',
        second: './src/second.js',
        vendor: ['lodash']
    },
    output: {
        path: path.resolve(workspaceRoot, './dist'),
        filename: '[name].js',
    },
    optimization: {
        // 不使用自带压缩配置(bundle文件不会被压缩)
        minimize: false,
        // 可以提供一个或多个定制的TerserPlugin实例覆盖默认的minimize配置
        // minimizer: [new  TerserPlugin({})],
        runtimeChunk: 'single',
        splitChunks: {
            // 默认是'async', 表示
            chunks: 'all',
        },
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        new CleanWebpackPlugin(),
        // new HtmlWebpackPlugin({
        //   template: './src/index.html',
        //   title: 'xxtest',
        // }),
        // new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            // {
            //     test: /\.scss$/,
            //     use: [
            //         MiniCssExtractPlugin.loader,
            //         'css-loader',
            //         'sass-loader',
            //     ],
            // },
        ]
    },
    // devServer: {
    //     historyApiFallback: true,
    //     port: 8088,
    //     publicPath: '/',
    // }
}
