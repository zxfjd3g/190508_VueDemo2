/* 
入口JS
*/
import Vue from 'vue'

import App from './App.vue'
import router from './router'

// 注册全局组件

new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>',
  router, // 配置路由器
})

new Vue({
  render: h => h(App) // 返回<App/>, 将其渲染到el上
  // render: createElement => createElement(App)
}).$mount('#app')