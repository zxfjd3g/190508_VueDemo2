<template>
  <div>
    <mt-button style="width: 100%" type="primary" @click="test">测试mint-ui</mt-button>
  </div>
</template>

<script type="text/ecmascript-6">
  import { MessageBox } from 'mint-ui'
  export default {
    methods: {
      test () {
        MessageBox('提示', '操作成功');
      }
    }
  }
</script>

<style>
  
</style>
