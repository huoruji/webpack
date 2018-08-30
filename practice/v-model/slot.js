// 自定义v-model
import Vue from 'vue'

const component = {
  // template: `
  //   <div>
  //     <div class="header">
  //       <slot name="header"></slot>
  //     </div>
  //     <div class="footer">
  //     <slot name="footer"></slot>
  //     </div>
  //   </div>
  // `
  template: `
    <div>
      <slot value="444"></slot>
    </div>
  `
}

new Vue({
  el: '#root',
  components: {
    CompOne: component
  },
  data: {
    value: 123
  },
  // 作用于插槽
  template: '<comp-one ><span slot-scope="props">{{props.value}}</span></comp-one>'
  // template: '<comp-one><div slot="header">header</div><div slot="footer">footer</div></comp-one>'
  // template: '<comp-one :value="value" @input="value = arguments[0]"></comp-one>'

})
