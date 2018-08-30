<template>
    <main v-if="navigationState.programList !=null">
          <ProgramDetail v-if="eventState.selectedEvent"/>
          <!-- <div id='grid'> -->
          <Card  v-for="(event, index ) in navigationState.programList"
          :key="index"
          :event="event"/>
        <!-- </div> -->

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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
main {
    overflow: scroll;
    position: relative;
  // #grid {
    width: 100%;
    background-color: white;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  // }
}
</style>
