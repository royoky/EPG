<template>
  <div id="app">
    <navigation-bar ref="navbar" v-if="loaded" />
    <grid-view ref="grid" v-if="loaded"/>
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
    const events = await fetch('data/GenericEvents.json')
    navigationState.allPrograms = await events.json()
    const channels = await fetch('data/GenericServices.json')
    navigationState.channelList = await channels.json()
    this.loaded = true
    // this.$refs.navbar.setfocus()
    document.addEventListener('keydown', this.arrowKeysListener)
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
