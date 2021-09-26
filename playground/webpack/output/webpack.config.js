const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
const path = require('path')

const workspaceRoot = path.resolve(__dirname, './')

module.exports = {
    mode: 'production',
    entry: {
        main: './src/main.js',
    },
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
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
        ]
    },
    devServer: {
        historyApiFallback: true,
        port: 8088,
        publicPath: '/',
    }
}
