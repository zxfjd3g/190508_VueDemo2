import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'   // 模板: 标签格式的字符串
})
