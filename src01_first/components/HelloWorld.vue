<template>
  <div>
    <h2>{{title}}</h2>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'HelloWorld',
    data () {
      return {
        title: 'HelloWorld 组件'
      }
    }
  }
</script>

<style scoped>
  h2 {
    color: red;
  }
</style>

