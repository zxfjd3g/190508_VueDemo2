/* 
包含n个用于间接更新状态数据的方法的对象
*/
import axios from 'axios'

import {
  REQUESTING,
  REQ_SUCCESS,
  REQ_ERROR
} from './mutation-types'

export default {

  /* 
  请求获取user列表的异步action
  */
  async searchUsers ({commit}, searchName) {
     // 更新状态数据
     commit(REQUESTING)
     // 发ajax请求获取user列表
     const url = `https://api.github.com/search/users`
     try {
       const response = await axios.get(url, {
         params: {
           q: searchName
         }
       })
       // 成功了, 更新为成功状态
       const users = response.data.items.map(item => ({
         name: item.login,
         url: item.html_url,
         avatar_url: item.avatar_url
       }))
       commit(REQ_SUCCESS, {users})
     } catch (error) {
       // 失败了, 更新为失败状态
       commit(REQ_ERROR, '请求异常: '+ error.message)
     }
  }
}
