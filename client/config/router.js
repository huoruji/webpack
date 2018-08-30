import Router from 'vue-router'

import routes from './routes'

// const router = new Router({
//   routes
// })

// export default router
// 服务端渲染会导致内存溢出

export default () => {
  return new Router({
    routes,
    mode: 'history', // url去掉#号
    // base: '/base/' // 基础路径 /base/app
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
    scrollBehavior (to, from, savedPosition) { // 页面的滚动行为
      console.log(to, from, savedPosition)
      if (savedPosition) {
        return savedPosition
      } else {
        return {x: 0, y: 0}
      }
    }
    // fallback: true
  })
}
