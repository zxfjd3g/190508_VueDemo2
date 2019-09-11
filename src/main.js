/* 
入口JS
*/
import Vue from 'vue'

import App from './App.vue'
import './base.css'

// 创建 一个vm对象, 作为全局事件总线(对象)保存到Vue原型对象上, 所有的组件都能直接可见
Vue.prototype.$bus = new Vue()

new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})
