<template>
    <main v-if="navigationState.programList !=null">
        <ChannelRow class="row"
          v-for="(channel, index ) in navigationState.channelList"
          :key="index"
          :channel="channel">
        </ChannelRow>
    </main>
</template>
<script>
import { eventState } from '../states/event-state'
import { navigationState } from '../states/navigation-state'
import { keyboardNavigation } from '../mixins/keyboard-navigation'
import ChannelRow from './ChannelRow.vue'
export default {
  name: 'ChannelView',
  mixins: [keyboardNavigation],
  components: {
    ChannelRow
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
