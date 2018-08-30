import Vue from 'vue'
import Component from './func-notification'

const NotificationConstructor = Vue.extend(Component)

const notify = (options) => {
  if (Vue.prototype.$isDerver) return

  const instance = new NotificationConstructor({})

}

