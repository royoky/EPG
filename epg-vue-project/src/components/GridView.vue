<template>
    <main>
        <Card  v-for="(event, index ) in events" 
          :key="index" 
          :event="event" 
          :selectEvent="selectEvent"/>         
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
  }, 
  async created () { 
    try { 
      let response = await fetch('data/GenericEvents.json') 
      this.events = await response.json() 
      console.log(this.events)
    } catch (error) { 
      console.error(error) 
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
  background-color: white;
  flex-grow: 1;
  overflow: scroll;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>
