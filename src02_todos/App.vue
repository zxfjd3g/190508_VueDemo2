<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo"/>
      <List :todos="todos" :removeTodo="removeTodo" :completeTodo="completeTodo"/>
      <Footer :todos="todos" :selectAll="selectAll" :clearAllComplete="clearAllComplete"/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from './components/Header'
  import List from './components/List.vue'
  import Footer from './components/Footer.vue'

  export default {
    data () {
      return {
        todos: []
      }
    },

    mounted() {
      // 模拟异步读取todos数据
      setTimeout(() => {
        const todos = JSON.parse(localStorage.getItem('todos_key') || '[]')
        this.todos = todos
      }, 1000);
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
