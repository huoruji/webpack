// 自定义v-model
import Vue from 'vue'

const component = {
  model: {
    prop: 'value1',
    event: 'change'
  },
  props: ['value1'],
  template: `
    <div>
      <input type="text" @input="handleClick" :value="value1"/>
      {{value1}}
    </div>
  `,
  methods: {
    handleClick (e) {
      this.$emit('change', e.target.value)
    }
  }
}

new Vue({
  el: '#root',
  components: {
    CompOne: component
  },
  data: {
    value: 123
  },
  template: '<comp-one :value="value" v-model="value"></comp-one>'
  // template: '<comp-one :value="value" @input="value = arguments[0]"></comp-one>'
})
