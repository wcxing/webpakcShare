##### 在开始webpack搭建react开发环境之前，先随意在github上看一个webpack、react项目
- [github上react项目示例](https://github.com/duxianwei520/react)
##### 我们可以看到项目里边使用了大量的jsx和es6的语法，或者sass、stylus等样式语法。我们知道浏览器并不支持jsx、sass，并且各个浏览器对es6的支持程度也不尽相同。那我们思考一个问题，这个项目是怎样最终运行到浏览器中的呢？

##### 浏览器可以识别的只有html、css、js，webpack运行打包之后会把以上项目文件打包成为相应的html、css、js文件进行输出，最终运行在浏览器中。

#### 目录
##### 一、webpack基础搭建
1. 加载css、less
2. 加载img
3. 加载icon-font
4. 配置babel
##### 二、开发环境优化
1. devServer配置
2. 模块热替换HMR配置
3. 更快的编译打包happypack配置
4. 配置react解析，配置react模块热替换
##### 三、项目优化
1. css抽离与压缩
2. js拆分打包与压缩
3. 按需加载
##### 四、代码规范配置
1. eslint在webpack中的使用
2. .editorconfig配置文件的使用

---
```
在这个仓库里边有两个分支，master和dev-01
除此之外还有4个tag，这些tag对应了以上目录中的四步，您可以运行
git tag 查看这些tag
git checkout [tagName] 切换到对应tag，查看每一步增量的变化
```

#### 一、webpack基础搭建
1. 项目初始化
```
// 新建项目目录，并进入新建的目录，进行项目初始化
npm init
```
2. 安装webpack4.x
```
// webpack 是项目打包的核心代码
// webpack-cli 是运行webpack的命令行工具，有了它我们就可以通过命令行运行webpackl
npm i webpack webpack-cli --save-dev
```
3. 新建js、css、html文件进行测试，运行webpack -entry --[入口文件]
```
webpack --entry ./src/test.js [文件路径]
// 在浏览器中打开html发现css并未生效
// 安装style-laoder、css-loader
// 在js中引用css时添加'style-loader!css-loader!...'
// 再次运行发现css已经生效
```
- 每次引用文件都要在文件路径前加相应loader，麻烦...
- 每次修改重新编译都要输入webpack --entry [entry],麻烦...

4. 添加webpack配置文件webpack.config.js

```
module.exports = {
    entry: './src/test.js',
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
    } 
}
```
5. 打开package.json文件，找到scripts字段
```
"scripts": {
    "dev": "webpack --config ./build/webpack.config.js"
}
```
6. 添加img、icon-font加载器
```
// 在这里需要注意：webpakc官网上加载img代码里写的时file-loader，而实际上需要用的时url-loader
// 安装file-loader、url-loader（url-loader依赖file-loader）
npm i file-loader url-loader -D
// 在webpack.config.js文件，modole.rules添加如下配置
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
// icon-font使用方式：
// 在js文件中import（rquire）'css文件所在路径（相对路径）' 
// 在html文件中<i class="icon-close"></i>
// img使用方式：
// 在js文件中import（rquire）'img文件所在路径（相对路径）' 并将其返回值付给一个变量
import imgUrl from './class_01.jpg'
// 或者 const imgUrl = require('./class_01.jpg')
// 使用时
img.src = imgUrl
// 重新编译后，重新打开html会发现图片并没有加载出来审查元素会发现，图片引用路径不正确
// 在webpack.config.js文件中配置：
output: {
    path: path.resolve(__dirname, '../output'),
    // 打包输出路径
    publicPath: '../output/'
    // 引用资源时会在路径前加上'../output/'
}
// 再次编译后打开html，图片正常显示
```
7. 配置babel
```
// 查看babel官网
npm install --save-dev babel-loader babel-core
npm install babel-preset-env --save-dev
npm install --save babel-polyfill
// 编写如下测试代码
const delay = async () => {
    const value = await getRequist()
    console.log(value)
}

function getRequist() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const value = 'new vlaue!'
            resolve(value)
        }, 2000)
    } )
}
delay()
// 如果未安装babel-polyfill运行后会报出如下错误：
// main.js:1 Uncaught ReferenceError: regeneratorRuntime is not defined
```
##### 至此，webpack已经可以正确编译打包我们项目所有的资源
#### 二、开发优化
我们希望开发过程中，修改文件后webpack可以自动编译，浏览器可以自动刷新
1. 使用webpack-devServer
```
// 安装webpack-dev-server
npm install webpack-dev-server --save-dev
// 配置
devServer: {
    host: '0.0.0.0', // 开发服务器域名
    port: '3333', // 端口
    open: true, // 启动时自动打开浏览器
    contentBase: path.resolve(__dirname, '../src')
}
// 修改package.json脚本
"dev": "webpack-dev-server --config ./build/webpack.config.js"
// 运行时会发现js部分没有加载成功
// 之前打包输出在dist或者output目录，可以看得到。因此我们可以在html中把路径写出来
// 现在，打包输出是在内存中的，这个路径我们该怎么引用呢？html-webpack-plu
```
2. 使用html-webpack-plugin
```
npm i html-webpack-plugin -D
// 配置如下：
plugins: [
    new HtmlWebpackPlugin({
        template: path.join(__dirname, '../src/index.html')
}
// 同时，删除掉配置中的output字段，因为开发环境并不需要打包输出文件到硬盘，并且output字段publicPath会对devServer造成影响，使得devServer请求不到资源
// 现在修改文件，webpack可以自动编译，浏览器可以自动刷新了
```
3. 使用HMR(hot module replacement)

> 模块热替换(Hot Module Replacement 或 HMR)是 webpack 提供的最有用的功能之一。它允许在运行时更新各种模块，而无需进行完全刷新。
```
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
plugins: [
...
new webpack.HotModuleReplacementPlugin()
]

```
4. 使用happypack
```
// 安装happypack
npm i happypack -D
// 配置
const HappyPack = require('happypack')
const os = require('os')
const HappyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }) //启动线程池
...
rules: [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        // loader: 'babel-loader'
        loader: 'happypack/loader?id=babel'
    }
]
plugins: [
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
```
5. 安装react
```
npm i react react-dom -S
// 浏览器不支持jsx，安装babel-preset-react
npm install --save-dev babel-preset-react
// 修改配置.babelrc文件，presets添加react
{
    "presets": ["env","react", "stage-0"]
}
// 编写测试文件
```
6. 配置react热更新
```
// webpack不支持js的热更新，react本质是js，在jsx语法中修改不会热更新，使用插件可以实现jsx的热更新
npm install --save-dev babel-plugin-react-transform
npm install --save-dev react-transform-hmr
// 添加配置.babelrc文件
"plugins": [["react-transform", {
    "transforms": [{
      "transform": "react-transform-hmr",
      
      "imports": ["react"],
      
      "locals": ["module"]
    }]
}]]
//  至此，react已经可以正常跑起来
```
##### 三、项目优化
截止到目前在webpack编译时我们在控制台中应该会看到如下warning
```
WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/

WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
This can impact web performance.
Assets:
  main.js (492 KiB)

WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (244 KiB). This can impact web performance.
Entrypoints:
  main (494 KiB)
      main.js
      0.9927794d193285d084ec.hot-update.js


WARNING in webpack performance recommendations:
You can limit the size of your bundles by using import() or require.ensure to lazy load some parts of your application.
For more info visit https://webpack.js.org/guides/code-splitting/
```
解决以上警告
1. 开发环境和生产环境需要不同的配置，拆分配置文件
```
// 安装webpack-merge
npm i webpack-merge -D
// 重命名webpack.config.js为webpack.base.config.js
// 新建webpack.dev.config.js、webpack.prod.config.js、webpack.test.config.js、webpack.beta.config.js文件
// 对开发环境进行基本抽离
// 每次build之前先删除上次输出的文件clean-webpack-plugin
// 安装
npm i clean-webpack-plugin -D
// 配置
new CleanWebpackPlugin([path.resolve(__dirname, '../output')], {
  root: path.resolve(__dirname, '../') // 定义根路径，否则会报超出根路径范围的错误，导致不能删除
}),
```
- mode
2. webpack4.x以后，提供了mode配置，可以选取的值有
development和production
3. 打包文件过大？所有的资源都打包进js文件造成了资源过大
```
// 代码分离和压缩
1. css分离和压缩
// webpakc4.x对于css的处理，官方推荐mini-css-extract-plugin
// 与extract-text-webpack-plugin相比：
// 异步加载、没有重复的编译（性能）、更容易使用、特定于CSS
npm install --save-dev mini-css-extract-plugin
// 这个插件目前还不支持热更新，所以只在build的时候使用它，调整配置文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
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
    ...
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name].[id].css'
    }),
    ...
]
```
2. 生产环境css代码压缩
```
// 安装optimize-css-assets-webpack-plugin
npm install --save-dev optimize-css-assets-webpack-plugin
// 配置
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin({})
    ]
},
```
3. webpack4.x中对mode为production时，会自动启用js压缩，当使用了optimize-css-assets-webpack-plugin对css进行压缩后，会发现原本production下的js压缩失效了，我们需要手动配置下
```
// 1. 安装
npm i -D uglifyjs-webpack-plugin
// 2. 配置
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js$/,
        exclude: /\/node_modules/,
        cache: true,
        parallel: true,
        // sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCssAssetsPlugin({})
    ]
}
```
4. splitChunks分块打包js
```
// 提取公共文件，更好的缓存
// 为实现懒加载做铺垫
// optimization.splitChunks
// 配置：
optimization: {
    splitChunks: {
        chunks: 'all', // async、initial
        minSize: 30000, //模块大于30k会被抽离到公共模块
        minChunks: 1, //模块出现1次就会被抽离到公共模块
        maxAsyncRequests: 5, //异步模块，一次最多只能被加载5个
        maxInitialRequests: 3, //入口模块最多只能加载3个
        name: true,
        cacheGroups: {
            vendor: {
                test: /node_modules/,
                chunks: 'all',
                name: 'vendor'
              },
            common: {
                test: /common\/|lib\//,
                chunks: 'all',
                name: 'common',
                enforce: true
              }
        }
    }
}
        
```
5. 图片压缩（...）
6. 按需加载
> 懒加载或者按需加载，是一种很好的优化网页或应用的方式。这种方式实际上是先把你的代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作后，立即引用或即将引用另外一些新的代码块。这样加快了应用的初始加载速度，减轻了它的总体体积，因为某些代码块可能永远不会被加载。
```
// react项目中最典型的应用就是路由的按需加载
// 1. 安装react-router-dom
// 2. 配置router
```
##### 四、附加：开发代码规范
1. eslint
```
// 1. 添加.eslintrc、eslintignore文件，eslint-loader会查找eslint配置文件
// 2. 安装 eslint-loader 和 eslint
npm i eslint eslint-loader -D
// 3. eslintrc基本配置
{
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "env": {
        "browser": true,
        "node": true
    },
    "rules": {
        "semi": 0
    }
}
4. 使用当下流行的eslint-config-airbnb配置
// eslint-config-airbnb依赖的包有好几个，在npm网站中查看文档，一一安装
npm i eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y eslint-config-airbnb -D
// 在eslintrc文件添加配置
{
    "extends": "airbnb",
    ...
}
```
2. editorconfig
```
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```



