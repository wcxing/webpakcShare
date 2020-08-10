const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    module: {
        rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            // loader: 'babel-loader'
            loader: 'happypack/loader?id=babel'
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
