<template>
    <main v-if="navigationState.programList !=null">
        <ProgramDetail v-if="eventState.selectedEvent"/>
        <ChannelView v-if="navigationState.channel"></ChannelView>
        <div id='grid' v-if="!navigationState.channel">
          <Card ref="card"
            v-for="(event, index ) in navigationState.programList"
            :key="index"
            :identifier="index"
            :event="event"
            />
        </div>
    </main>
</template>

<script>
import ProgramDetail from './ProgramDetail.vue'
import { eventState } from '../states/event-state'
import { navigationState } from '../states/navigation-state'
import { keyboardNavigation } from '../mixins/keyboard-navigation'
import Card from './Card.vue'
import ChannelView from './ChannelView.vue'

export default {
  name: 'GridView',
  mixins: [keyboardNavigation],
  components: {
    ChannelView,
    Card,
    ProgramDetail
  },
  data () {
    return {
      eventState,
      navigationState,
      events: null,
      isFocused: false
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
@import "../assets/style-library.less";
main {
    flex-grow:1;
    display: flex;
    flex-direction: column;
    height:100vh;
  #grid {
    padding-top: 15px;
    padding-bottom: 100px;
    width: 100vw;
    height: 100vh;
    background-color: @secondary-color;
    display: grid;
    grid-template-columns: 300px 300px 300px 300px 300px;
    grid-template-rows: 180px 180px 180px 180px 180px;
    grid-gap: 15px;
    justify-content: center;
    overflow: scroll;
  }
}
.focus {
  background-color: @primary-color;
}
</style>
