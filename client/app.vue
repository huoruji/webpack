<template>
  <div id="app">
    {{fullName}}
    <div id="cover"></div>
    <Header></Header>
    <!--<todo></todo>-->
    <transition name="fade">
     <router-view/>
    </transition>
    <router-link to="/app">app</router-link>
    <router-link to="/login">login</router-link>
    <notification content="test notify"/>
    <Footer></Footer>
  </div>
</template>

<script>
import {
  mapGetters,
  mapState,
  mapActions,
  mapMutations
} from 'vuex'

import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'

export default {
  components: {
    Header,
    Footer
    // Todo
  },
  mounted () {
    console.log(this.$store.state.count, this.textPlus)
    this.updateCountAsync({// 此种方式 定义在...mapActions(['updateCountAsync']),
    // this.$store.dispatch('updateCountAsync', {
      num: 5,
      time: 2000
    })

    // this.textAdd()
    // let i = 1
    // setInterval(() => {
    //   this.$store.commit('updateCount', i++)
    // }, 1000)
  },
  methods: {
    ...mapActions(['updateCountAsync']),
    ...mapMutations(['updateCount'])
  },
  computed: {
    // ...mapState(['count']),
    ...mapGetters({
      fullName: 'fullName'
    }),
    ...mapState({
      counter: (state) => state.count
    })
    // textA () {
    //   return this.$store.state.a.text
    // }
    // 以上写法等价于
    // function (state){
    //   return state.count
    // }
    // ...mapState({
    //   counter: 'count'
    // })
    // count () {
    //   return this.$store.state.count
    // },
    // fullName () {
    //   return this.$store.getters.fullName
    // }
  }
}
</script>

<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover{
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity .9
  z-index -1
}
#loading{
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  background-color rgba(255,255,255,.3)
  z-index 99
  display flex
  align-items center
  justify-content center
}
</style>


