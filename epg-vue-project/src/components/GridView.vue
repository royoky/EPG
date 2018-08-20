<template>
    <main>
        <Card  v-for="(event, index ) in events" 
          :key="index" 
          :event="event" 
          :selectEvent="selectEvent"/>         
    </main>
</template>

<script>
import Card from './Card.vue'

export default {
  name: 'GridView',
  components: {
    Card
  }, 
  data () { 
    return { 
      events: null, 
      selectedEvent: null 
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
      this.selectedEvent = event 
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
