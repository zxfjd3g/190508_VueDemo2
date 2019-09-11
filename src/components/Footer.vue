<template>
  <div class="todo-footer">
    <label>
     <slot name="left"></slot>
    </label>
    <slot name="middle"></slot>
    <slot name="right"></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    
  }
</script>

<style scoped>
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }
</style>
