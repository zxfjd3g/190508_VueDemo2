/* 
包含所有路由的数组
*/
import About from '../pages/About.vue'
import Home from '../pages/Home.vue'
import News from '../pages/News.vue'
import Message from '../pages/Message.vue'
import MessageDetail from '../pages/MessageDetail.vue'



export default [
  {
    path: '/about',
    component: About
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/home/news',
        component: News
      },
      {
        // path: '/home/message',
        path: 'message',
        component: Message,
        children: [
          {
            name: 'detail',
            path: '/home/message/detail/:id',
            props: route => ({id: route.params.id}),  // 将路由参数映射成路由组件的标签属性
            component: MessageDetail
          }
        ]
      },
      {
        path: '',
        redirect: '/home/news'
      }
    ]
  },

  {
    path: '/',
    redirect: '/about'
  }
]