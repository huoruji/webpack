import Vue from 'vue'

new Vue({
  el: '#root',
  template: '<div>{{text}}</div>',
  data: {
    text: 'aa'
  },
  render (h) { // h相当于createElement
    return h('div', {}, this.text)
  }
})
