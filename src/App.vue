<template>
  <div>
    <p>click {{count}}, count is {{evenOrOdd}}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">increment if odd</button>
    <button @click="incrementAsync">increment async</button>
  </div>
</template>

<script type="text/ecmascript-6">
/* 
mapState(): 将state数据映射成组件的计算属性
mapGetters(): 将getters数据映射成组件的计算属性
mapMutations(): 将包含commit()的函数映射成组件的方法
mapActions(): 将包含dispatch()的函数映射成组件的方法
*/
  import { mapState, mapGetters, mapMutations, mapActions } from "vuex"
  export default {

    /* computed: {
      count () {
        return this.$store.state.count
      },

      evenOrOdd () {
        return this.$store.getters.evenOrOdd
      }
    }, */
    computed: {
      ...mapState(['count']),  // {count() {return this.$store.state.count}}
      ...mapGetters(['evenOrOdd']), // {['evenOrOdd'] () {return this.$store.getters['evenOrOdd']}}
    },


    /* methods: {
      increment () {
        this.$store.commit('INCREMENT')
      },
      decrement () {
        this.$store.commit('DECREMENT')
      },
      incrementIfOdd () {
        this.$store.dispatch('incrementIfOdd')
      },
      incrementAsync () {
        console.log('----')
        this.$store.dispatch('incrementAsync')
      },
    } */

    methods: {
      ...mapActions(['incrementIfOdd', 'incrementAsync']),
      ...mapMutations({
        increment: 'INCREMENT',
        decrement: 'DECREMENT',
      })
    }
  };
</script>

<style>
</style>
