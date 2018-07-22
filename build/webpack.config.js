const path = require('path')

module.exports = {
    enrty: '../src/test.js',
    // output: {
    //     pathname: 
    // }
    module: {
        rules: [
        {
            test: /\.css$/,
            exclude: /node_modules/,
            loaders: ['style-loader', 'css-loader']
        }
    ]
    } 
}