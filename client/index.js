import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import Vuex from 'vuex'

import './assets/styles/global.styl'
import createRouter from './config/router'

import createStore from './store/store'
import Notification from './components/notification'
// import mutations from './store/mutations/mutations'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Notification)

const router = createRouter()
const store = createStore()
// 注册一个模块
store.registerModule('c', {
  state: {
    text: 3
  }
})

// 监听mutation调用情况
store.subscribe((mutation, state) => {
  console.log(mutation.type)
  console.log(mutation.payload)
})

// 监听action调用情况
store.subscribeAction((action, state) => {
  console.log(action.type)
  console.log(action.payload)
})

// const root = document.createElement('div')
// document.body.appendChild(root)

router.beforeEach((to, from, next) => { // 用于校验需要登录的页面
  next()
  // if (to.fullPath === '/app') {
  //   next('/login') // 还可以传入obj next({path:'/login',name:login,replace:})
  // } else {
  //   next()
  // }
})

router.beforeResolve((to, from, next) => {
  console.log('beforeResolve')
  next()
})

router.afterEach((to, from) => {
  console.log('afterEach')
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
