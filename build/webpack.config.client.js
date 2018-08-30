// 扩展配置
const path = require('path')

const HTMLPlugin = require('html-webpack-plugin')

const webpack = require('webpack')

const merge = require('webpack-merge')// 合并webpack配置

const isDev = process.env.NODE_ENV === 'development'

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const baseConfig = require('./webpack.config.base')

const VueClientPlugin = require('vue-server-renderer/client-plugin')

let config

const defualtPlugins = [
  new webpack.DefinePlugin({// js可以调用到环境变量
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  }),
  new VueClientPlugin() // 服务端渲染生成文件
]

const devServer = {
  port: 8001,
  host: '0.0.0.0',
  overlay: {
    errors: true // 把错误显示在页面上
  },
  historyApiFallback: {
    index: '/public/index.html' // template.html生成的index.html
  },
  hot: true
}

if (isDev) { // 开发环境
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.styl/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
          // use: [
          //   'css-loader',
          //   'stylus-loader',
          //   // MiniCssExtractPlugin.loader,
          //   'vue-style-loader',
          //   {
          //     loader: 'postcss-loader',
          //     options: {
          //       sourceMap: true
          //     }
          //   }
          // ]
          // use: ['vue-style-loader', 'css-loader', {
          //   loader: 'postcss-loader', // 自动生成sourceMap,提高编译效率
          //   options: {
          //     sourceMap: true
          //   }
          // }, 'stylus-loader']
        }
      ]
    },
    devServer,
    plugins: defualtPlugins.concat([
      new webpack.HotModuleReplacementPlugin()
      // webpack4升级修改点
      // new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else { // 生产环境
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js')
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
            MiniCssExtractPlugin.loader, 'css-loader', {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            }, 'stylus-loader']
        }
      ]
    },
    // webpack4升级修改点
    optimization: {
      spliteChunks: {
        chunks: 'all'
      },
      runtimeChunk: true
    },
    plugins: defualtPlugins.concat([
      new MiniCssExtractPlugin('styles.[contentHash:8].css')
      // webpack4升级修改点
      //   new webpack.optimize.CommonsChunkPlugin({// 分开打包类库
      //     name: 'vendor'
      //   }),
      //   new webpack.optimize.CommonsChunkPlugin({
      //     name: 'runtime'
      //   })
    ])
  })
}

module.exports = config
