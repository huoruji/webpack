import Todo from '../views/todo/todo.vue'
import Login from '../views/todo/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    // path: '/app/:id',
    path: '/app',
    // component: Todo,
    // 异步加载组件
    // component: () => import('../views/todo/todo.vue'),
    component: Todo,
    props: true
    // beforeEnter: (to, from, next) => {
    //   // ...
    // }
    // name: 'app',
    // meta: {
    //   title: 'this is title',
    //   description: 'this is description'
    // },
    // children: [
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login',
    component: Login
  }
]
