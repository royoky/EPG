<template>
    <div v-if="event.endReplay >= navigationState.today" class="card" @click="displayDetail()">
      <img :src="getUrl()" :alt="event.name">
      <img :src="getChannelUrl()" :alt="event.service_id" class="channel">
      <!-- <div class="channel">{{ event.service_id }}</div> -->
      <div class="infos">{{ event.name }}</div>
      <div class="time" v-if="getProgress() > 1">Disponible encore {{displayTime()}} </div>
      <div class="time" v-if="getProgress() < 0"> {{displayTime()}} </div>
      <ProgressBar v-if="getProgress() > 0 && getProgress() < 1" :progress="getProgress()" :timeLeft="event.duration" :id="createId()"></ProgressBar>
    </div>
</template>

<script>
import { navigationState } from '../states/navigation-state'
import { eventState } from '../states/event-state'
import { keyboardNavigation } from '../mixins/keyboard-navigation'
import moment from 'moment'
import ProgressBar from './ProgressBar.vue'

export default {
  name: 'Card',
  mixins: [keyboardNavigation],
  props: {
    event: { type: Object, required: true },
    identifier: Number
  },
  data () {
    return {
      eventState,
      navigationState
    }
  },
  components: {
    ProgressBar
  },
  methods: {
    getUrl () {
      return `/data/${this.event.image}`
    },
    getChannelUrl () {
      return `/data/channelsLogos/${this.event.service_id}.png`
    },
    displayDetail () {
      this.eventState.selectedEvent = Object.assign({ status: this.getProgress() }, this.event)
    },
    displayTime () {
      // return moment(this.event.start_date, 'X').format('HH:mm')
      if (this.getProgress() > 1) {
        moment.locale('fr')
        return `${moment(this.event.endReplay, 'X').to(moment(navigationState.today, 'X'), true)}`
      } else if (this.getProgress() < 0) {
        moment.locale('fr')
        return moment(this.event.start_date, 'X').from(moment(navigationState.today, 'X'))
      }
    },
    createId () {
      return `id${this.identifier}`
    },
    getProgress () {
      return (navigationState.today - this.event.start_date) / (this.event.end_date - this.event.start_date)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/style-library.less";
.card{
  position: relative;
  width: 298px;
  height: 167px;
  border: 1px @secondary-color solid;
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
  &:focus {
    border: 2px solid @primary-color !important;
    outline: none !important;
  }
  img {
    max-width: 100%;
    max-height: 100%;
  }
  .channel {
    position: absolute;
//    background-color: @grey;
    color: #ffffff;
    padding: 5px;
    top: 0px;
    right: 2px;
  }
  .infos {
    position: absolute;
    background-color: @grey;
    color: #ffffff;
    display: block;
    width: 100%;
    bottom: -10px;
    z-index: 1;
    font-size: larger;
  }
  .time {
    position: absolute;
    z-index: 1;
    bottom: 18px;
    background-color: lightgrey;
    color: black;
    padding: 5px;
    height: 15px;
  }
}
</style>
