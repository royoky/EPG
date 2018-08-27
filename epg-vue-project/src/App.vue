<template>
  <div id="app">
    <navigation-bar ref="navbar"/>
    <grid-view ref="grid"/>
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue'
import GridView from './components/GridView.vue'
import { eventState } from './states/event-state'
import { keyboardNavigation } from './mixins/keyboard-navigation'

export default {
  name: 'app',
  mixins: [keyboardNavigation],
  components: {
    NavigationBar,
    GridView
  },
  data () {
    return { eventState }
  },
  mounted () {
    this.$movePositionInGrid(1, 1)
  }
}
</script>

<style lang="less">
/* body {
  height: 100vh;
} */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
