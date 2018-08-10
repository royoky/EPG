<template>
  <div id="app">
    <navigation-bar/>
    <grid-view/>
    <program-detail/>
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue'
import GridView from './components/GridView.vue'
import ProgramDetail from './components/ProgramDetail.vue'

export default {
  name: 'app',
  components: {
    NavigationBar,
    GridView,
    ProgramDetail
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
