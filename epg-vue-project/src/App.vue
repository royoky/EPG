<template>
  <div id="app" v-if="loaded">
    <navigation-bar ref="navbar"/>
    <grid-view ref="grid"/>
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue'
import GridView from './components/GridView.vue'
import { eventState } from './states/event-state'
import { keyboardNavigation } from './mixins/keyboard-navigation'
import { navigationState } from './states/navigation-state'

export default {
  name: 'app',
  mixins: [keyboardNavigation],
  components: {
    NavigationBar,
    GridView
  },
  data () {
    return {
      eventState,
      loaded: false
    }
  },
  async mounted () {
    try {
      const events = await fetch('data/GenericEvents.json')
      navigationState.programAll = await events.json()
    } catch (error) {
      console.error(error)
    }
    try {
      const categories = await fetch('data/GenericCategories.json')
      navigationState.categoryList = await categories.json()
    } catch (error) {
      console.error(error)
    }
    // this.$refs.navbar.setfocus()
    // console.log(this.$refs.navbar.$refs)
    // this.$refs.navbar.$refs.menuelement['0'].setfocus()
    document.addEventListener('keydown', this.arrowKeysListener)
    this.loaded = true
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
