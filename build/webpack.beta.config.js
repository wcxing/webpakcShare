const webpack = require('webpack')
const merge = require('webpack-merge')

const buildWebpackConfig = require('./webpack.build.config.js')
module.exports = merge(buildWebpackConfig, {
    mode: 'development',
    plugins: [
        new webpack.DefinePlugin({
            _ENV_: JSON.stringify('beta')
        })
    ]
})