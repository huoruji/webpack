// 扩展配置
const path = require('path')

// const HTMLPlugin = require('html-webpack-plugin')

const webpack = require('webpack')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const merge = require('webpack-merge')// 合并webpack配置

const isDev = process.env.NODE_ENV === 'development'

const baseConfig = require('./webpack.config.base')

const VueServerPlugin = require('vue-server-renderer/server-plugin') // 服务端渲染插件

let config

const plugins = [
  new MiniCssExtractPlugin('styles.[contentHash:8].css'),
  new webpack.DefinePlugin({// js可以调用到环境变量
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.VUE_ENV': '"server"'
  })
]

if (isDev) {
  plugins.push(new VueServerPlugin())
}
console.log(isDev)
if (isDev) { // 开发环境
  config = merge(baseConfig, {
    target: 'node',
    entry: path.join(__dirname, '../client/server-entry.js'),
    devtool: 'source-map', // 提供代码调试的功能
    output: {
      libraryTarget: 'commonjs2', // 指定暴露入口的方式 module.exports
      filename: 'server-entry.js',
      path: path.join(__dirname, '../server-build')
    },
    externals: Object.keys(require('../package.json').dependencies), // vue vuex vue-router
    module: {
      rules: [
        {
          test: /\.styl/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'vue-style-loader',
            'stylus-loader'
          ]

          // MiniCssExtractPlugin.extract({
          //   fallback: 'vue-style-loader',
          //   use: ['css-loader', {
          //     loader: 'postcss-loader', // 自动生成sourceMap,提高编译效率
          //     options: {
          //       sourceMap: true
          //     }
          //   }, 'stylus-loader']
          // })
        }
      ]
    },
    plugins,
    // import Vue from vue 指定引入的vue.js文件，如果不指定，页面无法用template
    resolve: {
      alias: {
        'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
      }
    }
  })
} else { // 生产环境
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../practice/index.js')
      // webpack4升级修改点
      // vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkHash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.styl/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'vue-style-loader',
            'stylus-loader'
          ]
          // use: MiniCssExtractPlugin.extract({
          //   fallback: 'vue-style-loader',
          //   use: ['css-loader', {
          //     loader: 'postcss-loader', // 自动生成sourceMap,提高编译效率
          //     options: {
          //       sourceMap: true
          //     }
          //   }, 'stylus-loader']
          // })
        }
      ]
    },
    // webpack4升级修改点
    // optimization: {
    //   spliteChunks: {
    //     chunks: 'all'
    //   },
    //   runtimeChunk: true
    // },
    plugins
  })
}

module.exports = config
