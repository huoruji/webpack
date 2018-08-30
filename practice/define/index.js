import Vue from 'vue'

const component = {
  props: {
    active: {
      type: Boolean,
      required: true
    },
    propOne: String
  },
  template: `
    <div>
      <input v-show="active" type="text" v-model="text"/>
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
  }
}

// Vue.component('CompOne', component)

new Vue({
  components: {
    CompOne: component
  },
  el: '#root',
  template: `
    <div>
      <comp-one :active="true" prop-one="text11" @change="handleClick"></comp-one>
      <comp-one :active="false"></comp-one>
    </div>
  `,
  methods: {
    handleClick () {
      console.log(1111)
    }
  }
})
