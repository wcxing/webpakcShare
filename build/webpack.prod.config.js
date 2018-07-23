const webpack = require('webpack')
const merge = require('webpack-merge')

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const buildWebpackConfig = require('./webpack.build.config')
module.exports = merge(buildWebpackConfig, {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            _ENV_: JSON.stringify('prod')
        })
    ],
    // 生产环境启用压缩
    optimization: {
        // 压缩
        minimizer: [
          new UglifyJsPlugin({
            test: /\.js$/,
            exclude: /\/node_modules/,
            cache: true,
            parallel: true,
            // sourceMap: true // set to true if you want JS source maps
          }),
          new OptimizeCssAssetsPlugin({})
        ],
        // js分块打包
        runtimeChunk: {
            name: 'manifest'
        },
    },
})