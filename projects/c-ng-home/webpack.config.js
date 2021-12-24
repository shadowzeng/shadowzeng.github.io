const ngToolsWebpack = require('@ngtools/webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

const workspaceRoot = path.resolve(__dirname, './')
const projectRoot = path.resolve(__dirname, './')

// 参考
// https://github.com/angular/angular-cli/blob/master/packages/angular_devkit/build_webpack/test/angular-app/webpack.config.js
// https://medium.com/ag-grid/webpack-tutorial-understanding-ngtools-webpack-306dd7f9e07d

module.exports = {
    mode: 'production',
    resolve: {
        extensions: ['.ts', '.js'],
    },
    entry: {
        polyfills: path.resolve(projectRoot, './src/polyfills.ts'),
        main: path.resolve(projectRoot, './src/main.ts'),
        // 会输出style.js插入到html head中, 配合MiniCssExtractPlugin.loader使用(从包含css的js文件中生成css文件插入到head)
        style: ['./src/styles.scss'],
    },
    output: {
        path: path.resolve(workspaceRoot, './dist'),
        filename: '[name].js',
    },
    plugins: [
        new ngToolsWebpack.AngularWebpackPlugin({
            tsConfigPath: path.resolve(projectRoot, './tsconfig.app.json')
        }),
        // 会以该html为基础输出一个插入了script的html文件
        new HtmlWebpackPlugin({
          template: './src/index.html'
        }),
        // 静态资源文件直接复制
        new CopyWebpackPlugin({
          patterns: [
            {from: './src/assets', to: './assets'},
            {from: './src/data', to: './data'},
            {from: './src/favicon.ico', to: './favicon.ico'},
          ]
        }),
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {test: /\.ts$/, loader: '@ngtools/webpack'},
            {
                test: /\.scss$/,
                rules: [
                  {
                    oneOf: [
                      {
                        exclude: [path.resolve('./src/styles.scss')],
                        use: [
                          'raw-loader',
                          'postcss-loader',
                        ]
                      },
                      {
                        include: [path.resolve('./src/styles.scss')],
                        use: [
                          // 将这个loader换成style-loader, 则会以<style>标签形式插入css内容，适用于development环境
                          MiniCssExtractPlugin.loader, // 必须要在plugins中加入该plugin才能使用这个loader
                          'css-loader', // 会对 @import 和 url() 进行处理
                        //   'postcss-loader',
                        ],
                      },
                    ]
                  },
                  {
                    // 作为上面oneOf中rules的共有loader
                    use: [
                      // 'resolve-url-loader', // 这个配合sass-loader使用
                      'sass-loader',
                    ]
                  }
                ],
            },
            // {
            //   test: /\.css$/,
            //   rules: [
            //     {
            //       oneOf: [
            //         {
            //           include: [path.resolve(__dirname, './src/styles.scss')],
            //           use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            //         }
            //       ]
            //     }
            //   ]
            // },
        ]
    },
    devServer: {
        historyApiFallback: true,
        port: 8088,
        publicPath: '/',
    }
}
