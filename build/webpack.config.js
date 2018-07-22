const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// happypack
const HappyPack = require('happypack')
const os = require('os')
const HappyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }) //启动线程池

module.exports = {
    entry: ['babel-polyfill', './src/test.js'],
    // output: {
    //     path: path.resolve(__dirname, '../output'),
    //     publicPath: '../output/'
    // },
    module: {
        rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            // loader: 'babel-loader'
            loader: 'happypack/loader?id=babel'
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
    },
    devServer: {
        host: '0.0.0.0',
        port: '3333',
        open: true,
        // publicPath: '/',
        contentBase: path.resolve(__dirname, '../src'),
        historyApiFallback: true,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../src/index.html')
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
            }
            ],
            threadPool: HappyThreadPool
            // ... 其它配置项
        })
    ]
}