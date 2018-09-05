<template>
  <main>
    <div id="channelName">{{channel.number}}</div>
    <div class="grid" >
      <MiniCard v-for="(event, index ) in getEventByChannel(channel.number)"
      :key="index"
      :event="event"
      >
      </MiniCard>
    </div>
  </main>
</template>
<script>
import { navigationState } from '../states/navigation-state'
import MiniCard from './MiniCard.vue'
import moment from 'moment'
export default {
  name: 'ChannelRow',
  components: {
    MiniCard
  },
  props: {
    channel: Object
  },
  methods: {
    getEventByChannel (channelNumber) {
      const endNow = moment(navigationState.today, 'X').add(1, 'h').format('X')
      let listOfEvents = navigationState.allPrograms
      let listOfChannels = navigationState.channelList
      const channel = listOfChannels.find(element => element.number === channelNumber)
      listOfEvents = listOfEvents.filter(element => element.service_id === channel.id)
      listOfEvents = listOfEvents.filter(element => element.start_date < endNow && element.end_date > navigationState.today)
      return listOfEvents
    }
  }
}
</script>
<style lang="less" scoped>
@import "../assets/style-library.less";
main {
    flex-grow:1;
    display: flex;
    flex-direction: column;
    height:100vh;
    // overflow: scroll;
    #channelName {
      width: 20px;
      display: inline-block;
    }
  .grid {
    padding-top: 15px;
    padding-bottom: 100px;
    background-color: @secondary-color;
    // display: grid;
    // grid-template-columns: 300px 300px 300px 300px 300px;
    // grid-template-rows: 180px 180px 180px 180px 180px;
    // grid-gap: 15px;
  }
}
</style>
