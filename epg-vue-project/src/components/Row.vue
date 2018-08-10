<template>
    <div>
      <Card v-for="(event, index) in events" 
          :key="index" 
          :event="event" 
          :selectEvent="selectEvent"/>
    </div>
</template>
<script>
import Card from './Card.vue'

export default {
  name: 'Row',
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

div {
  display: flex;
  background-color:white;
}

</style>
