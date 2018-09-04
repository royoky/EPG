<template>
    <div v-bind:class="{ focus: isFocused }" class="card" @click="displayDetail()">
      <img :src="getUrl()" :alt="event.name">
      <div class="infos">
        <div class="channel">{{ event.service_id }}</div>
        <p>{{ event.name }} {{ displayDate () }} {{ displayDuration () }}</p>
        <progressBar :progress="getProgress()" :timeLeft="getDuration()"></progressBar>
      </div>
    </div>
</template>

<script>
import { navigationState } from '../states/navigation-state'
import { eventState } from '../states/event-state'
import { keyboardNavigation } from '../mixins/keyboard-navigation'
import progressbar from './ProgressBar.vue'
import moment from 'moment'

export default {
  name: 'Card',
  mixins: [keyboardNavigation],
  props: {
    event: { type: Object, required: true }
  },
  data () {
    return {
      eventState
    }
  },
  components: {
    progressbar
  },
  methods: {
    getUrl () {
      return `/data/${this.event.image}`
    },
    displayDetail () {
      this.eventState.selectedEvent = this.event
    },
    displayDate () {
      return moment(this.event.start_date, 'X').format('DD/MM/YY HH:mm')
    },
    displayDuration () {
      return moment.duration(this.event.end_date - this.event.start_date, 'seconds').humanize()
    },
    getDuration () {
      return moment.duration(this.event.end_date - this.event.start_date, 'seconds').format('x')
    },
    getProgress () {
      return (navigationState.today - this.event.start_date) / (this.event.end_date - this.event.start_date)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

div.card{
  position: relative;
  width: 298px;
  height: 167px;
  border: 1px grey solid;
  display:flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex-direction: row;
  flex-basis: 15%;
  margin: 10px;
  img {
    max-width: 100%;
  }
  div.infos {
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    background-color: grey;
    color: #ffffff;
    display: block;
    width: 100%;
    bottom: 0px;
    height: 50px;
    z-index: 1;
    div.channel {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
.focus {
  background-color: chartreuse !important;
}
</style>
