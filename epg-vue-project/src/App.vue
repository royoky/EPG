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
import { displayMenuEvents } from './mixins/displayMenuEvents'
import moment from 'moment'

export default {
  name: 'app',
  mixins: [keyboardNavigation, displayMenuEvents],
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
      // const response = await events.json()
      this.navigationState.programAll = await events.json()
    } catch (error) {
      console.error(error)
    }
    this.navigationState.programAll = this.navigationState.programAll.map(element => Object.assign({
      endReplay: moment(element.start_date, 'X').add(7, 'd').format('X'),
      duration: (element.end_date - this.navigationState.today) * 1000,
      recorded: false,
      bookmarked: false
    }, element))
    try {
      const categories = await fetch('data/GenericCategories.json')
      this.navigationState.categoryList = await categories.json()
    } catch (error) {
      console.error(error)
    }
    try {
      const channels = await fetch('data/GenericServices.json')
      this.navigationState.channelList = await channels.json()
    } catch (error) {
      console.error(error)
    }
    this.navigationState.channelList = this.navigationState.channelList.map(element => Object.assign({
      action: `getEventByChannel(${element.number})`
    }, element))
    document.addEventListener('keydown', this.arrowKeysListener)
    this.loaded = true
  }
}
</script>

<style lang="less">
@import "~normalize.css";
@import "./assets/style-library.less";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  overflow: hidden;
  #app div:focus {
    border: 3px solid @primary-color;
  }
}
</style>
