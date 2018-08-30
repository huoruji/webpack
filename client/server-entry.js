import createApp from './create-app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()
    router.push(context.url)

    router.onReady(() => { // 回调
      const matchedxComponents = router.getMatchedComponents()// 根据url匹配组件
      if (!matchedxComponents) {
        return reject(new Error('no component matched'))
      }
      resolve(app)
    })
  }).then((res) => {
    // console.log('then', res)
  }).catch((err) => {
    console.log('err', err)
  })
}
