<template>
    <div v-bind:class="{ focus: isFocused }" @click="displayDetail()">
      <p>{{ event.name }}</p>
      <p>{{ displayDate () }}</p>
      <p>{{ displayTime () }}</p>
      <p>{{ displayDuration () }}</p>
      <p>{{ event.service_id }}</p>
    </div>
</template>

<script>
import { eventState } from '../states/event-state'
import { keyboardNavigation } from '../mixins/keyboard-navigation'

export default {
  name: 'Card',
  mixins: [keyboardNavigation],
  props: {
    event: { type: Object, required: true }
  },
  data () {
    return {
      eventState,
 //     isFocused: false
    }
  },
  methods: {
    displayDetail () {
      this.eventState.selectedEvent = this.event
    },
    displayDate () {
      return new Date(this.event.start_date * 1000).toLocaleDateString()
    },
    displayTime () {
      return new Date(this.event.start_date * 1000).toLocaleTimeString()
    },
    displayDuration () {
      return `${(this.event.end_date - this.event.start_date) / 60} min`
    },
    // setfocus () {
    //   this.isFocused = true
    // },
    // unsetfocus () {
    //   this.isFocused = false
    // }
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
  flex-basis: 15%;
}
.focus {
  background-color: chartreuse !important;
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
p {
  display: block;
  width: 100%;
}
</style>
