<template>
  <main id="app">
    <navigation-bar/>
  </main>
</template>

<script>
import navigationBar from './components/navigationBar.vue'

export default {
  name: 'app',
  components: {
    navigationBar
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
