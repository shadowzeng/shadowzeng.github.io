// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

const workspaceRoot = path.resolve(__dirname, './')
const projectRoot = path.resolve(__dirname, './')

module.exports = {
    mode: 'production',
    resolve: {
        alias: {
            'src/web/': path.resolve(__dirname, './src/web/'),
        },
        extensions: ['.ts', '.js'],
    },
    entry: {
        // main: path.resolve(projectRoot, './src/web/internal/main.ts'),
        style: ['./src/style.scss'],
    },
    output: {
        path: path.resolve(workspaceRoot, './dist'),
        filename: '[name].js',
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: './src/web/internal/index.html',
        // }),
        // 静态资源文件直接复制
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {from: './src/assets', to: './assets'},
        //         {from: './src/data', to: './data'},
        //         {from: './src/favicon.ico', to: './favicon.ico'},
        //     ],
        // }),
        // new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    // 'style-loader',
                    'css-loader',
                    // 'resolve-url-loader',
                    'sass-loader',
                    // {
                        // sassOptions: {
                        //     includePaths: ['./'],
                        // },
                    // },
                ],
            },
        ],
    },
    target: 'web',
    // watch: true,
    devServer: {
        historyApiFallback: true,
        port: 8088,
        compress: false,
        publicPath: '/',
    },
}
