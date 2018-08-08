<template>
  <main id="app">
    <navigation-bar/>
    <grid-view/>
  </main>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue'
import GridView from './components/GridView.vue'

export default {
  name: 'app',
  components: {
    NavigationBar,
    GridView
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
