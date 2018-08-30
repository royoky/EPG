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

export default {
  name: 'app',
  components: {
    NavigationBar,
    GridView
  },
  data () {
    return {
      eventState,
      i: 0,
      switchRow: 6
    }
  },
  methods: {
    arrowKeysListener (event) {
      console.log(event.keyCode)
      switch (event.keyCode) {
        // Down key
        case 40:
        console.log(this.$refs.navbar)
          if (this.$refs.navbar.isFocused) {
            this.$refs.navbar.unsetfocus()
            this.$refs.grid.setfocus()
            this.$refs.grid.$refs.card[this.i].setfocus()
            break
          }
          if (this.$refs.grid.isFocused) {
            this.$refs.grid.$refs.card[this.i].unsetfocus()
            this.$refs.grid.$refs.card[this.i + this.switchRow].setfocus()
            this.i = (this.i + this.switchRow)
          }
          break
        // Up key
        case 38:
          if (this.i >= this.switchRow) {
            this.$refs.grid.$refs.card[this.i].unsetfocus()
            this.$refs.grid.$refs.card[this.i - this.switchRow].setfocus()
            this.i = (this.i - this.switchRow)
          }
          break
        // Right key
        case 39:
          this.$refs.grid.$refs.card[this.i].unsetfocus()
          this.$refs.grid.$refs.card[this.i + 1].setfocus()
          this.i++
          break
        // Left key
        case 37:
          if (this.i !== 0) {
            this.$refs.grid.$refs.card[this.i].unsetfocus()
            this.$refs.grid.$refs.card[this.i - 1].setfocus()
            this.i--
            break
          }
          break
      }
    }
  },
  mounted () {
    this.$refs.navbar.setfocus()
    document.addEventListener('keydown', this.arrowKeysListener)
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
