const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
const path = require('path')

const workspaceRoot = path.resolve(__dirname, './')

module.exports = {
    mode: 'production',
    resolve: {
        extensions: ['.ts', '.js'],
    },
    entry: {
        main: './src/main.ts',
        second: './src/second.ts',
        vendor: ['lodash']
        // style: './src/style.scss',
    },
    output: {
        path: path.resolve(workspaceRoot, './dist'),
        filename: '[name].js',
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          template: './src/index.html',
          title: 'xxtest',
        }),
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {test: /\.ts$/, loader: 'ts-loader', options: {configFile: 'tsconfig.json'}},
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
