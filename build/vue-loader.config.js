module.exports = (isDev) => {
  return {
    preserveWhitepace: true, // 去掉htm中的空格
    extractCSS: !isDev, // 根据环境需要，选择需不需要另外打包css,不用将所有的css都加载到页面上，.vue文件中的css也会单独打包出来
    hotReload: false, // 根据环境变量生成
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      camelCase: true // 命名方式 把A-B方式转变成 preserveWhitepace两个单词不需要中间的连接字符的方式
    }
  }
}
