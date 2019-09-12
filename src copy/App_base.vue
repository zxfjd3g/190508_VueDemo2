<template>
  <div>
    <h2 v-if="!repoName">loading...</h2>
    <div v-else>most star repo is <a :href="repoUrl">{{repoName}}</a></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  export default {
    data () {
      return {
        repoName: '',
        repoUrl: ''
      }
    },

    mounted () {
      // 使用vue-resource发ajax请求
      const url = `/api/search/repositories?q=j&sort=stars`
      /* this.$http.get(url).then(
        response => {
          const result = response.data
          const {name, html_url} = result.items[0]
          this.repoName = name
          this.repoUrl = html_url
        },

        error => {
          debugger
          alert('请求出错: ' + error.status)
        }
      ) */

      axios.get(url).then(
        response => {
          const result = response.data
          const {name, html_url} = result.items[0]
          this.repoName = name
          this.repoUrl = html_url
        },

        error => {
          debugger
          alert('请求出错: ' + error.message)
        }
      )

    }
  }
</script>

<style scoped>
</style>
