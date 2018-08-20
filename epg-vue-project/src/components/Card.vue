<template>
    <div @click="displayDetail()">
      <p>{{programTitle}}</p>
      <!-- <img src="https://fusion.molotov.tv/arts/m2/224x294/Ch8SHQoUABCYcXst-g-SvGbBGATubTtpbjUSA2pwZxgBCh8IARIbChRwzxG_b6v-8CTE4AfET920jtUAkBIDcG5n/jpg"/> -->
    </div>
</template>

<script>
import { eventState } from '../states/event-state'

export default {
  name: 'Card',
  props: {
    programTitle: String
  },
  data () {
    return { eventState }
  },
  methods: {
    displayDetail () {
      this.eventState.selectedEvent = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

div{
  width: 226px;
  height: 296px;
  border: 1px grey solid;
  border-radius: 5%;
  display:flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex-direction: row;
}
img {
  max-width: 100%;
  border: 1px solid black;
  border-radius: 5%;
  transition: transform 2s;
  &:hover {
    border: 2px solid black;
    transform: scale(1.05);
    cursor: pointer;
  }
}
</style>
