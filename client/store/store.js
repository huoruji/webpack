import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'

import getters from './getters/getters'

import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  const store = new Vuex.Store({// 使用服务端渲染，防止内存溢出，每次返回新的store
    strict: isDev,
    state: defaultState,
    mutations,
    getters,
    actions,
    plugins: [// vuex插件
      (store) => {
        console.log('invoked')
      }
    ]
    // modules: {
    //   a: {
    //     namespaced: true, // 强制加上命名空间
    //     state: {
    //       text: 1
    //     },
    //     mutations: {
    //       updateText (state, text) {
    //         state.text = text
    //       }
    //     },
    //     getters: {
    //       textPlus (state, getters, rootState) {
    //         return state.text + 1 + rootState.b.text
    //       }
    //     },
    //     actions: {
    //       add ({ state, commit, rootState }) {
    //         commit('updateCount', {num: 33333}, {root: true})
    //         // commit('updateText', rootState.count)
    //       }
    //     }
    //   },
    //   b: {
    //     state: {
    //       text: 2
    //     },
    //     actions: {
    //       textAdd ({ commit }) {
    //         commit('a/updateText', 'test textAdd')
    //       }
    //     }
    //   }
    // }
  })

  // vuex的热更替功能
  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default
      const newGetters = require('./getters/getters').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }
  return store
}
