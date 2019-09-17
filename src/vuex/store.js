/* 
vuex最核心的管理对象模块: store
*/
import Vue from 'vue'
import Vuex from 'vuex'

// 声明使用vue插件
Vue.use(Vuex)

/* 
包含状态数据的对象
相当于data对象
*/
const state = {
  count: 1
}

/* 
包含n个用于直接更新状态数据的方法的对象
*/
const mutations = {
  /* 数量加1 */
  INCREMENT (state) {
    state.count++
  },
  /* 数量减1 */
  DECREMENT (state) {
    state.count--
  }
}

/* 
包含n个用于间接更新状态数据的方法的对象
方法中可以包含逻辑代码与异步代码
*/
const actions = {
  /* increment ({commit}) {
    commit('INCREMENT')
  },
  decrement ({commit}) {
    commit('DECREMENT')
  }, */
  incrementIfOdd ({commit, state}) { // 包含逻辑操作
    if (state.count %2 === 1) {
      commit('INCREMENT')
    }
  },
  incrementAsync ({commit}) { // 包含异步操作
    setTimeout(() => {
      commit('INCREMENT')
    }, 1000);
  },
}

/* 
包含n个基于state数据的getter计算属性的方法的对象
*/
const getters = {
  evenOrOdd (state) {
    return state.count%2===1 ? '奇数' : '偶数'
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})