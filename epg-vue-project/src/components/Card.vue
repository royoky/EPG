<template>
    <div class="card" @click="displayDetail()">
      <img :src="getUrl()" :alt="event.name">
      <div class="infos">
        <div class="channel">{{ event.service_id }}</div>
        <p>{{ event.name }} {{ displayDate () }} {{ displayDuration () }}</p>
      </div>
    </div>
</template>

<script>
import { eventState } from '../states/event-state'
import moment from 'moment'
export default {
  name: 'Card',
  props: {
    event: { type: Object, required: true }
  },
  data () {
    return { eventState }
  },
  methods: {
    getUrl () {
      return `/data/${this.event.image}`
    },
    displayDetail () {
      this.eventState.selectedEvent = this.event
    },
    displayDate () {
      return moment(this.event.start_date, 'X').format("DD/MM/YY HH:mm")
    },
    displayDuration () {
      // const start = moment(this.event.start_date, 'X')
      // console.log(start)
      // const end = moment(this.event.end_date, 'X')
      // console.log(end)
      // return start.to(end)
      return moment.duration(this.event.end_date - this.event.start_date, 'seconds').humanize()
      // return `${(this.event.end_date - this.event.start_date) / 60} min`
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

</style>
