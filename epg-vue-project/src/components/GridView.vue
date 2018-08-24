<template>
    <main v-if="navigationState.programList !=null">
        <Card  ref="card" v-for="(event, index ) in navigationState.programList"
          :key="index"
          :event="event"
          :program-title="event.name"
          :selectEvent="selectEvent"/>
          <ProgramDetail v-if="eventState.selectedEvent"/>
    </main>
</template>

<script>
import ProgramDetail from './ProgramDetail.vue'
import { eventState } from '../states/event-state'
import { navigationState } from '../states/navigation-state'
import Card from './Card.vue'

export default {
  name: 'GridView',
  components: {
    Card,
    ProgramDetail
  },
  data () {
    return {
      eventState,
      navigationState,
      events: null
    }
  }, /*
   async updated () {
     try {
       let response = await fetch('data/GenericEvents.json')
       this.events = await response.json()
       console.log(this.events)
     } catch (error) {
       console.error(error)
     }
   }, */
  methods: {
    selectEvent (event) {
      this.eventState.selectedEvent = event
    },
    created () {
      addEventListener('keydown', this.detectKey)
    },
    detectKey (event) {
      switch (event.keyCode) {
        // Down key
        case 40:
          this.$refs.card.removeFocus()
          this.$refs.card.setFocus(this.i)
          break
      // Up key
        case 38:
          this.$refs.Header.setFocus()
          this.$refs.MovieList.removeFocus(this.i)
          break
        // Right key
        case 39:
          if (this.$refs.Header.isFocused === false) {
            this.i++
            this.$refs.MovieList.setFocus(this.i)
            this.$refs.MovieList.removeFocus(this.i - 1)
            break
          }
        // Left key
        case 37:
          if (this.$refs.Header.isFocused === false) {
            this.i--
            this.$refs.MovieList.setFocus(this.i)
            this.$refs.MovieList.removeFocus(this.i + 1)
            break
          }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
main {
  background-color: white;
  flex-grow: 1;
  overflow: scroll;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  position: relative;
}
</style>
