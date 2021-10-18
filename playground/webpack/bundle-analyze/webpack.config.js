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
        // vendor: ['lodash']
    },
    output: {
        path: path.resolve(workspaceRoot, './dist'),
        filename: '[name].js',
        chunkFilename: '[name]-[id].chunk.js'
    },
    optimization: {
        // 不使用自带压缩配置(bundle文件不会被压缩)
        minimize: false,
        // 可以提供一个或多个定制的TerserPlugin实例覆盖默认的minimize配置
        // minimizer: [new  TerserPlugin({})],
        /**
         * 设置为true或'multiple', 会为每个entry都增加一个runtime chunk
         * 设置为'single', 则只会输出一个runtime chunk
         * 不配置则没有额外的runtime chunk输出
         */
        // runtimeChunk: true,
        splitChunks: {
            // 默认是'async', 表示
            // chunks: 'initial',
            // 最少需要多少字节才会生成chunk
            // minSize: 20000,
            // minRemainingSize: 0,
            // 模块最少需要被引用多少次才会被拆分为chunk
            // minChunks: 1,
            // 按需加载时最大chunks请求数目
            // maxAsyncRequests: 30,  // 默认30
            // 初始加载时最大chunks请求数目
            // maxInitialRequests: 30, // 默认30
            // enforceSizeThreshold: 50000,
            // 以下是cacheGroups默认配置
            // cacheGroups: {
            //     defaultVendors: {
            //         test: /[\\/]node_modules[\\/]/,
            //         priority: -10,
            //         reuseExistingChunk: true,
            //     },
            //     default: {
            //         minChunks: 2,
            //         priority: -20,
            //         reuseExistingChunk: true,
            //     },
            // },
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
