const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
const path = require('path')

const workspaceRoot = path.resolve(__dirname, './')

module.exports = {
    mode: 'production',
    entry: {
        main: './src/main.tsx',
    },
    output: {
        path: path.resolve(workspaceRoot, './dist'),
        filename: '[name].js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        alias: {
            "@": path.resolve(__dirname, './src'),
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'esbuild-loader',
                    options: {
                        loader: 'tsx',
                        target: 'es2015',
                    },
                },
            },
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
    externals: {
        react: "React",
        "react-dom": "ReactDOM",
    },
}
