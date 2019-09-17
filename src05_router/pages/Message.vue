<template>
  <div>
    <ul>
      <li v-for="m in messages" :key="m.id">
        <router-link :to="`/home/message/detail/${m.id}`">{{m.title}}</router-link>
        ---<button @click="pushShow(m.id)">push查看</button>
        ---<button @click="replaceShow(m.id)">replace查看</button>
      </li>
    </ul>
    <button @click="$router.back()">回退</button>
    <hr>
    <router-view />
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        messages: []
      }
    },

    mounted () {
       // 模拟发请求异步获取数据
      setTimeout(() => {
        const messages = [
          {id: 1, title: 'message001'},
          {id: 2, title: 'message002'},
          {id: 3, title: 'message003'},
        ]
        this.messages = messages
      }, 1000)
    },

    methods: {
      pushShow (id) {
        // 编程式路由跳转/导航
        this.$router.push(`/home/message/detail/${id}`)
      },
      replaceShow (id) {
        // 编程式路由跳转/导航
        this.$router.replace(`/home/message/detail/${id}`)
      }
    }
  }
</script>

<style scoped>

 
</style>
