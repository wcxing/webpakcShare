const path = require('path')

module.exports = {
    entry: ['babel-polyfill', './src/test.js'],
    output: {
        path: path.resolve(__dirname, '../output'),
        publicPath: '../output/'
    },
    module: {
        rules: [
        { 
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.css$/,
            exclude: /node_modules/,
            loaders: ['style-loader', 'css-loader']
        },
        {
            test: /\.less$/,
            exclude: /node_modules/,
            loaders: ['style-loader', 'css-loader', 'less-loader']
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [
            {
                loader: 'url-loader',
                options: {
                limit: 8192
                }
            }
            ]
        },
        {
            test: /\.(woff|svg|woff2|eot|ttf|otf)$/,
            loader: 'url-loader'
        }
    ]
    } 
}