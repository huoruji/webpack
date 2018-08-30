import Vue from 'vue'

const component = {
  props: {
    active: Boolean,
    propOne: String
  },
  template: `
    <div>
      <input type="text" v-model="text"/>
      <span @click="handleClick">{{propOne}}</span>
    </div>  
    `,
  data () {
    return {
      text: 123
    }
  },
  methods: {
    handleClick () {
      this.$emit('change')
    }
  },
  mounted () {
    console.log(this.$parent.$options.name)
  }
}

// const Comp = Vue.extend(component)

// new Comp({
//   el: '#root',
//   propsData: {
//     propOne: 'eeee'
//   }
// })

const component2 = {
  extends: component,
  data () {
    return {
      text: 567
    }
  }
}

new Vue({
  name: 'Root',
  el: '#root',
  components: {
    Comp: component2
  },
  template: `<comp prop-one="3333"></comp>`
})
