<template>
  <ul>
    <li>ID: {{$route.params.id}}</li>
    <li>TITLE: {{detail.title}}</li>
    <li>CONTENT: {{detail.content}}</li>
  </ul>
</template>

<script type="text/ecmascript-6">
  const allDetails = [
    {id: 1, title: 'message001', content: 'message content001'},
    {id: 2, title: 'message002', content: 'message content002'},
    {id: 3, title: 'message003', content: 'message content003'},
  ]
  export default {

    props: { // 声明接收属性: id
      id: String
    },

    data () {
      return {
        detail: {}
      }
    },

    mounted () {
      this.showDetail(this.id * 1)
    },

    watch: {
      id (value) {// 重新发请求
        this.showDetail(value * 1)
      }
    },

    methods: {
      showDetail (id) {
        setTimeout(() => {
          const detail = allDetails.find(detail => detail.id===id) 
          this.detail = detail
        }, 1000);
      },
    }
  }
</script>

<style scoped>

 
</style>
