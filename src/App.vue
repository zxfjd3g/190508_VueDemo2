<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo"/>
      <List :todos="todos" :removeTodo="removeTodo"/>
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
        todos: [
          {id: Date.now(), title: 'A', complete: false},
          {id: Date.now() + 1, title: 'B', complete: true},
          {id: Date.now() + 2, title: 'C', complete: false},
        ]
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
