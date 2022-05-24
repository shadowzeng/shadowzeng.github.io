const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
const {ESBuildMinifyPlugin} = require('esbuild-loader')
const path = require('path')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')

const workspaceRoot = path.resolve(__dirname, './')

module.exports = merge(commonConfig, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new ESBuildMinifyPlugin({
                target: 'es2015',
                css: true,
            })
        ],
    },
})
