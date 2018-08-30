import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template: '<div>{{text}}{{obj.a}}</div>',
  data: {
    text: 0,
    obj: {}
  },
  watch: {
    text (newValue, oldValue) {
      // console.log(newValue, oldValue)
    }
  }
})

app.$mount('#root')

let i = 0
setInterval(() => {
  // app.text += 1
  i++
  app.$set(app.obj, 'a', i)
  // app.$options.data += 1
}, 1000)

// console.log(app.$data)

// console.log(app.$props)

// console.log(app.$el)

// console.log(app.$options)

// app.$options.render = (h) => {
//   return h('div', {}, 'new render function')
// }

// console.log(app.$root === app)

// console.log(app.$children)

// app.$watch('text', (newValue, oldValue) => {
//   console.log(newValue, oldValue)
// })

// console.log(app.$slots)

// console.log(app.$refs)

// 服务端渲染的时候用到
// console.log(app.$isServer)

app.$on('test', () => {
  console.log('test emited')
})

app.$emit('test')

// 强制重新渲染
// app.forceUpdate()
