const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const MiniCssExtractPlugin = require("mini-css-extract-plugin")

// happypack
const HappyPack = require('happypack')
const os = require('os')
const HappyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }) //启动线程池

const baseWebpackConfig = require('./webpack.base.config.js')

module.exports = merge(baseWebpackConfig, {
    output: {
        path: path.resolve(__dirname, '../output/'),
        filename: '[name].[hash].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loaders: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.less$/i,
                exclude: /node_modules/,
                loaders: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([path.resolve(__dirname, '../output')], {
            root: path.resolve(__dirname, '../')
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../src/index.html'),
        }),
        // 抽离css
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].[id].css'
        }),
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
    ],
    optimization: {
        // js分块打包
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            chunks: 'all', // async、initial
            minSize: 30000, //模块大于30k会被抽离到公共模块
            minChunks: 1, //模块出现1次就会被抽离到公共模块
            maxAsyncRequests: 5, //异步模块，一次最多只能被加载5个
            maxInitialRequests: 3, //入口模块最多只能加载3个
            name: true,
            cacheGroups: {
              // 打包第三方文件
              // 在 prod 环境是会有maxInitialRequests参数的限制
              // webpack会自动打包vender，vender过大时，我们提取出我们想要的文件即可，剩下的会打到vender中
              react: {
                test: /node_modules(\/react|\react-dom)/,
                // chunks: all,
                // name: 're'
              },
            //   lib: {
            //     test: /node_modules\/lodash/
            //   },
              // vendor: {
              //   test: /node_modules/,
              //   chunks: 'all',
              //   name: 'vendor'
              // },
              // 打包公共库文件
              common: {
                test: /common\/|lib\//,
                chunks: 'all',
                name: 'common',
                enforce: true
              }
            }
        }
    },
})

