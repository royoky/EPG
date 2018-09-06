<template>
    <div id='detail'>
        <span class='close' @click="closeDetail">&times;</span>
        <div id='imgContainer'>
          <img :src=getUrl() :alt=eventState.selectedEvent.name>
        </div>
        <div id='detailsContainer'>
          <h3>{{ eventState.selectedEvent.name }}</h3>
          <p>{{ eventState.selectedEvent.description }}</p>
          <DetailButton ref="button"
            v-for="(button, index ) in eventState.selectedEvent.buttons"
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
    window.addEventListener('keyup', this.detectEscapeKey)
    if (eventState.selectedEvent.status > 1) {
      this.buttons = [
        { name: 'Recommander' },
        { name: 'Catch up' }
      ]
      this.eventState.selectedEvent = Object.assign({ buttons: this.buttons }, this.eventState.selectedEvent)
    } else if (eventState.selectedEvent.status < 0) {
      this.buttons = [
        { name: 'Enregistrer' },
        { name: 'Recommander' }
      ]
      this.eventState.selectedEvent = Object.assign({ buttons: this.buttons }, this.eventState.selectedEvent)
    } else if (eventState.selectedEvent.status > 0 && eventState.selectedEvent.status < 1) {
      this.buttons = [
        { name: 'Enregistrer' },
        { name: 'Recommander' },
        { name: 'Play' },
        { name: 'Catch up'}
      ]
      this.eventState.selectedEvent = Object.assign({ buttons: this.buttons }, this.eventState.selectedEvent)
    }
  },
  beforeUpdate () {
    if (eventState.selectedEvent.status > 1) {
      this.buttons = [
        { name: 'Recommander' },
        { name: 'Catch up' }
      ]
      this.eventState.selectedEvent = Object.assign({ buttons: this.buttons }, this.eventState.selectedEvent)
    } else if (eventState.selectedEvent.status < 0) {
      this.buttons = [
        { name: 'Enregistrer' },
        { name: 'Recommander' }
      ]
      this.eventState.selectedEvent = Object.assign({ buttons: this.buttons }, this.eventState.selectedEvent)
    } else if (eventState.selectedEvent.status > 0 && eventState.selectedEvent.status < 1) {
      this.buttons = [
        { name: 'Enregistrer' },
        { name: 'Recommander' },
        { name: 'Play' },
        { name: 'Catch up'}
      ]
      this.eventState.selectedEvent = Object.assign({ buttons: this.buttons }, this.eventState.selectedEvent)
    }
  },
  beforeDestroy () {
    window.removeEventListener('keyup', this.detectEscapeKey)
  }
}
</script>

<style lang='less' scoped>
div#detail {
  width: 100%;
  position:relative;
  background-color: black;
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  color: white;
  height:fit-content;
  align-items: center;
  white-space: pre-line;
  #detailContainer {
    padding: 20px;
  }
  p {
    padding: 20px;
  }
  button {
    margin: 5px;
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
