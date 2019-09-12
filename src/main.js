/* 
入口JS
*/
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'

// 声明使用使用vue插件
Vue.use(VueResource) // 它内部调用install()给组件对象添加了一个$http属性对象

Vue.prototype.$eventBus = new Vue()

new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})
