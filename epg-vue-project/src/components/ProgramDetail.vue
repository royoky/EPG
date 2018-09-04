<template>
    <div id='detail'>
        <span class='close' @click="closeDetail">&times;</span>
        <div id='imgContainer'>
          <img :src=getUrl() alt="Alt Title" height="300">
        </div>
        <div id='detailsContainer'>
          <h3>{{ eventState.selectedEvent.name }}</h3>
          <p>"{{ eventState.selectedEvent.description }}</p>
          <DetailButton ref="button"
            v-for="(button, index ) in buttons"
            :key="index"
            :button="button"
        />
        </div>
    </div>
</template>

<script>
import { eventState } from '../states/event-state'
import DetailButton from './DetailButton.vue'
export default {
  name: 'ProgramDetail',
  components: {
    DetailButton
  },
  props: {
    event: Object
  },
  data () {
    return {
      eventState,
      buttons: [] }
  },
  methods: {
    getUrl () {
      return `/data/${eventState.selectedEvent.image}`
    },
    closeDetail () {
      eventState.selectedEvent = null
    },
    // Function to detect the Escape key and close the detail window
    detectEscapeKey (event) {
      if (event.keyCode === 27) {
        this.closeDetail()
      }
    }
  },
  created () {
    window.addEventListener('keydown', this.detectEscapeKey)
    this.buttons = [
      { name: 'Record' },
      { name: 'Bookmark' },
      { name: 'Startover' }
    ]
  },
  beforeDestroy () {
    window.removeEventListener('keydown', this.detectEscapeKey)
  }
}
</script>

<style lang='less' scoped>
div#detail {
  width: 100%;
  position:relative;
  background-color: black;
  display: flex;
  flex-shrink: 0;
  color: white;
  height:auto;
  align-items: stretch;
  #detailContainer {
    padding: 20px;
  }
  p {
    padding: 20px;
  }
  // The Close Button
  .close {
    color: #aaa;
    //float: right;
    font-size: 28px;
    font-weight: bold;
    position: absolute;
    top: 0;
    right: 0;
  }
  .close:hover,
  .close:focus {
    color: gray;
    text-decoration: none;
    cursor: pointer;
  }
}
</style>
