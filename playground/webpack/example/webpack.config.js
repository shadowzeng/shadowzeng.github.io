// const ngToolsWebpack = require('@ngtools/webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

const workspaceRoot = path.resolve(__dirname, './')

module.exports = {
    mode: 'production',
    resolve: {
        extensions: ['.ts', '.js'],
    },
    entry: {
        main: './src/main.ts',
        // style: './src/style.scss',
    },
    output: {
        path: path.resolve(workspaceRoot, './dist'),
        filename: '[name].js',
    },
    plugins: [
        // new ngToolsWebpack.AngularWebpackPlugin({
        //     tsConfigPath: path.resolve(projectRoot, './tsconfig.app.json')
        // }),
        new HtmlWebpackPlugin({
          template: './src/index.html'
        }),
        // new CopyWebpackPlugin({
        //   patterns: [
        //     {from: './src/assets', to: './assets'},
        //     {from: './src/data', to: './data'},
        //     {from: './src/favicon.ico', to: './favicon.ico'},
        //   ]
        // }),
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            // {test: /\.ts$/, loader: '@ngtools/webpack'},
            {test: /\.ts$/, loader: 'ts-loader'},
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
