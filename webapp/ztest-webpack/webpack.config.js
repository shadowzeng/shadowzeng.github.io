var path = require('path');

module.exports = {
    entry: './index.js',
    output:{
        path: path.join(__dirname,'./'),
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
                presets: ['es2015']
            }
        }]
    }
};