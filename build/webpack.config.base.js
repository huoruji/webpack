// 被依赖的配置
const path = require('path')

const createVueLoaderOptions = require('./vue-loader.config.js')

const isDev = process.env.NODE_ENV === 'development' // 开发环境true，生产环境false

const config = {
  // webpack4升级修改点
  mode: process.env.NODE_ENV || 'production', // development|| production
  target: 'web',
  entry: path.join(__dirname, '../client/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/'
  },
  module: {
    rules: [
      {
        test: /\.(vue|jsx|js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'// 预处理
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      { // 忽略掉node_module中的文件
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_module/
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'resource/[path][name].[hash:8].[ext]'// 根据开发目录，生成资源目录结构
            }
          }
        ]
      }
    ]
  }
}

module.exports = config
