<template>
    <main v-if="navigationState.programList !=null">
        <Card v-for="(event, index ) in navigationState.programList"
          :key="index"
          :event="event"
          :program-title="event.name"
          :selectEvent="selectEvent"
          ref="card"/>
          <ProgramDetail v-if="eventState.selectedEvent"/>
    </main>
</template>

<script>
import ProgramDetail from './ProgramDetail.vue'
import { eventState } from '../states/event-state'
import { navigationState } from '../states/navigation-state'
import { keyboardNavigation } from '../mixins/keyboard-navigation'
import Card from './Card.vue'

export default {
  name: 'GridView',
  mixins: [keyboardNavigation],
  components: {
    Card,
    ProgramDetail
  },
  data () {
    return {
      eventState,
      navigationState,
      events: null,
      isFocused: false
    }
  },
  methods: {
    selectEvent (event) {
      this.eventState.selectedEvent = event
    },
    setfocus () {
      this.isFocused = true
    },
    unsetfocus () {
      this.isFocused = false
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
.focus {
  background-color: chartreuse;
}
</style>
