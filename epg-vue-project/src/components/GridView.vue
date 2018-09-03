<template>
    <main v-if="navigationState.programList !=null">
        <ProgramDetail v-if="eventState.selectedEvent"/>
        <div id='grid'>
          <Card ref="card"
            v-for="(event, index ) in navigationState.programList"
            :key="index"
            :event="event"
            />
        </div>
    </main>
</template>

<script>
import ProgramDetail from './ProgramDetail.vue'
import { eventState } from '../states/event-state'
import { navigationState } from '../states/navigation-state'
import Card from './Card.vue'
import { keyboardNavigation } from '../mixins/keyboard-navigation'

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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
main {
    flex-grow:1;
    display: flex;
    flex-direction: column;
    height:100vh;
  #grid {
    width: 100%;
    background-color: white;
    display:flex;
    flex-grow: 1;
    flex-wrap: wrap;
    justify-content: flex-start;
    overflow: scroll;
  }
}
.focus {
  background-color: chartreuse;
}
</style>
