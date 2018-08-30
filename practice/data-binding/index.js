import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div :class=[{active:!isActive}]>
        {{isActive?'active':'not active'}}
    </div>
  `,
  data: {
    isActive: false,
    active: {
      color: '#ff800'
    },
    fullName: '1111'
  },
  computed: {
    name () {

    }
  },
  watch: {
    // fullName (newName, oldName) {
    //   console.log(newName, oldName)
    // }
    fullName: {
      handler (newName, oldName) {
        console.log(newName, oldName)
      },
      immediate: 111,
      deep: true
    }
  }
})
