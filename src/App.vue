<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!-- <Header @addTodo="addTodo"/> -->
      <Header ref="header"/>
      <List :todos="todos" :completeTodo="completeTodo"/>
      <Footer>
        <input type="checkbox" v-model="checkAll" slot="left"/>

        <button class="btn btn-danger" v-show="completeSize>0" @click="clearAllComplete" slot="right">清除已完成任务</button>

        <span slot="middle">
          <span>已完成{{completeSize}}</span> / 全部{{todos.length}}
        </span>
      </Footer>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from './components/Header'
  import List from './components/List.vue'
  import Footer from './components/Footer.vue'

  /* 
  function Fn(params) {
    
  }

  this.prototype = {}
  this.prototype.constructor = Fn

  const fn = new Fn()
  this.__proto__ = Fn.prototype
  
   // new Person() // this.__proto__ = Person.prototype
  */

 

  export default {
    data () {
      return {
        todos: []
      }
    },

    computed: {
      completeSize () {
        return this.todos.reduce((pre, todo) => pre + (todo.complete ? 1 : 0), 0)
      },

      checkAll: {
        get () {
          return this.todos.length===this.completeSize
        },
        set (value) {// value就checkAll最新的值true/false
          this.selectAll(value)
        }
      }
    },

    mounted() {
      console.log('App', this)

      // this.__proto__.__proto__就是Vue原型对象
      // this.__proto__就是Vue的实例对象vm

      // 模拟异步读取todos数据
      setTimeout(() => {
        const todos = JSON.parse(localStorage.getItem('todos_key') || '[]')
        this.todos = todos
      }, 1000);

      // 绑定自定义事件监听
      this.$refs.header.$on('addTodo', this.addTodo)
      // 绑定自定义事件监听(removeTodo)
      this.$bus.$on('removeTodo', this.removeTodo)
    },

    beforeDestroy() {
      // 移除事件监听
      this.$bus.$off('removeTodo')
      this.$refs.header.$off('addTodo')
    },

    watch: {
      todos: {
        deep: true, // 深度监视
        handler (val) { // todos发生改变的监视回调函数
          // 保存最新的todos到local
          localStorage.setItem('todos_key', JSON.stringify(val))
        },
      }
    },

    methods: {
      // 增加todo
      addTodo (todo) {
        this.todos.unshift(todo)
      },

      // 删除todo
      removeTodo (index) {
        this.todos.splice(index, 1)
      },

      // 全选/全不选
      selectAll (check) {
        this.todos.forEach(todo => todo.complete = check)
      },

      // 清除已完成的
      clearAllComplete () {
        this.todos = this.todos.filter(todo => !todo.complete)
      },

      // 选中/不选中指定todo
      completeTodo (check, todo) {
        todo.complete = check
      }
    },

    components: {
      Header,
      List,
      Footer
    }
  }
</script>

<style scoped>
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
