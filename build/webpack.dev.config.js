const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')


// happypack
const HappyPack = require('happypack')
const os = require('os')
const HappyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }) //启动线程池

const baseWebpackConfig = require('./webpack.base.config.js')
module.exports = merge(baseWebpackConfig, {
    mode: 'development', // 代码打包后为非压缩模式，默认为 'production'
    devServer: {
        host: '0.0.0.0',
        port: '3333',
        open: true,
        // publicPath: '/',
        contentBase: path.resolve(__dirname, '../src'),
        historyApiFallback: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                loaders: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../src/index.html')
        }),
        new webpack.DefinePlugin({
            _ENV_: JSON.stringify('dev')
        }),
        new webpack.HotModuleReplacementPlugin(),
        // happypack
        new HappyPack({
            // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
            id: 'babel',
            // 如何处理 .js 文件，用法和 Loader 配置中一样
            loaders: [
            {
                loader: 'babel-loader'
            },
            // 启用eslint
            // {
            //     loader: 'eslint-loader'
            // }
            ],
            threadPool: HappyThreadPool
            // ... 其它配置项
        })
    ]
})
