<template>
    <div v-if="endReplay() >= navigationState.today" v-bind:class="{ focus: isFocused }" class="card" @click="displayDetail()">
      <img :src="getUrl()" :alt="event.name">
      <div class="channel">{{ event.service_id }}</div>
      <div class="infos">{{ event.name }}</div>
      <div class="time" v-if="getProgress() > 1"> replay {{displayTime()}} </div>
      <div class="time" v-if="getProgress() < 0"> {{displayTime()}} </div>
      <ProgressBar v-if="getProgress() > 0 && getProgress() < 1" :progress="getProgress()" :timeLeft="getDuration()" :id="createId()"></ProgressBar>
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
    displayDetail () {
      this.eventState.selectedEvent = this.event
    },
    endReplay () {
      return moment(this.event.start_date, 'X').add(7, 'd').format('X')
    },
    displayTime () {
      // return moment(this.event.start_date, 'X').format('HH:mm')
      if (this.getProgress() > 1) {
        return `${moment(this.endReplay(), 'X').to(moment(navigationState.today, 'X'), true)} left`
      } else if (this.getProgress() < 0) {
        return moment(this.event.start_date, 'X').from(moment(navigationState.today, 'X'))
      }
    },
    createId () {
      return `id${this.identifier}`
    },
    getDuration () {
      const duration = (this.event.end_date - navigationState.today) * 1000
      return duration
    },
    getProgress () {
      const progress = (navigationState.today - this.event.start_date) / (this.event.end_date - this.event.start_date)
      return progress
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/style-library.less";
div.card{
  position: relative;
  width: 298px;
  height: 167px;
  border: 1px @secondary-color solid;
  display:flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex-direction: row;
  img {
    max-width: 100%;
    max-height: 100%;
  }
  div.channel {
    position: absolute;
    background-color: @grey;
    color: #ffffff;
    padding: 5px;
    top: 0;
    right: 0;
  }
  div.infos {
    position: absolute;
    background-color: @grey;
    color: #ffffff;
    display: block;
    width: 100%;
    bottom: 0px;
    z-index: 1;
  }
  div.time {
    position: absolute;
    z-index: 1;
    bottom: 18px;
    background-color: @grey;
    color: #ffffff;
    padding: 5px;
    height: 15px;
  }
}
.focus {
  border: 2px @primary-color solid !important;
}
</style>
