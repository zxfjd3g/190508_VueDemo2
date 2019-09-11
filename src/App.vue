<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header/>
      <List/>
      <Footer/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from './components/Header'
  import List from './components/List'
  import Footer from './components/Footer'

  export default {
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
