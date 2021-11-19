const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
const path = require('path')

const workspaceRoot = path.resolve(__dirname, './')

module.exports = {
    mode: 'production',
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            'css': path.resolve(workspaceRoot, './'),
        },
    },
    entry: {
        style: './main.scss',
    },
    output: {
        path: path.resolve(workspaceRoot, './dist'),
        filename: '[name].js',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    // 'raw-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    'css-loader',
                ],
            },
        ]
    },
    optimization: {
        // 不使用自带压缩配置(bundle文件不会被压缩)
        minimize: false,
    },
}
