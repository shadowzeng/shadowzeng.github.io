var path = require('path');

module.exports = {
    entry: './reacttest/index.jsx',
    output:{
        path: path.join(__dirname,'/test'),
        filename: 'bundle.js',
        libraryTarget: 'umd',
        library: 'eMap'
    },
    module:{
        rules:[{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015','react']
            }
        }]
    }
};