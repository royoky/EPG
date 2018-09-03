<template>
  <div id="app">
    <navigation-bar/>
    <grid-view/>
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue'
import GridView from './components/GridView.vue'
import { eventState } from './states/event-state'

export default {
  name: 'app',
  components: {
    NavigationBar,
    GridView
  },
  data () {
    return { eventState }
  }
}
</script>

<style lang="less">
@import "~normalize.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  overflow: hidden;
}
</style>
