<template>
  <div class="todo-header">
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" v-model="title" @keyup.enter="add"/>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: { // 指定了标签属性: 属性名/属性值类型/属性的必要性
      addTodo: {
        type: Function,
        required: true,
      }
    },

    data () {
      return {
        title: ''
      }
    },

    methods: {
      add () {
        // 对输入数据进行检查
        if (!this.title) {
          return
        }

        // 根据输入数据封装一个todo
        const todo = {
          id: Date.now(),
          title: this.title,
          complete: false
        }

        // 调用addTodo来添加todo
        this.addTodo(todo)

        // 清除输入
        this.title = ''
      }
    }
  }
</script>

<style scoped>
  .todo-header input {
    width: 560px;
    height: 28px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 7px;
  }

  .todo-header input:focus {
    outline: none;
    border-color: rgba(82, 168, 236, 0.8);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
  }
</style>
