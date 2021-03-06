/* 
入口JS
*/
import Vue from 'vue'
import App from './App.vue'

import store from './vuex/store'


Vue.prototype.$eventBus = new Vue()

new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>',
  store
})
