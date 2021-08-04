const ngToolsWebpack = require('@ngtools/webpack')
const path = require('path')

const workspaceRoot = path.resolve(__dirname, './')
const projectRoot = path.resolve(__dirname, './')

// 参考https://github.com/angular/angular-cli/blob/master/packages/angular_devkit/build_webpack/test/angular-app/webpack.config.js

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.ts', '.js'],
    },
    entry: {
        main: path.resolve(projectRoot, './src/main.ts'),
        polyfills: path.resolve(projectRoot, './src/polyfills.ts')
    },
    output: {
        path: path.resolve(workspaceRoot, './dist'),
        filename: '[name].js',
    },
    plugins: [
        new ngToolsWebpack.AngularWebpackPlugin({
            tsConfigPath: path.resolve(projectRoot, './tsconfig.app.json')
        })
    ],
    module: {
        rules: [
            {test: /\.css$/, loader: 'raw-loader'},
            {test: /\.html$/, loader: 'raw-loader'},
            {test: /\.ts$/, loader: '@ngtools/webpack'},
            {
                test: /\.component\.(css|sass|scss)$/,
                exclude: [path.resolve('node_modules'), path.resolve('src/styles.scss')],
                include: [path.resolve('src/app')],
                use: [
                    'raw-loader',
                    // {
                    //     loader: 'postcss-loader',
                    //     options: {
                    //         plugins: [
                    //             require('postcss-modules')({
                    //                 generateScopedName: '[hash:base64:5]'
                    //             }),
                    //             require('postcss-import')
                    //         ]
                    //     }
                    // },
                    'sass-loader'
                ]
            },
        ]
    },
    devServer: {
        historyApiFallback: true
    }
}
