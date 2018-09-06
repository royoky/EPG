<template>
    <div id='detail'>
        <span class='close' @click="closeDetail">&times;</span>
        <div id='imgContainer'>
          <img :src=getUrl() :alt=eventState.selectedEvent.name>
        </div>
        <div id='detailsContainer'>
          <h3>{{ eventState.selectedEvent.name }}</h3>
          <p>{{ eventState.selectedEvent.description }}</p>
          <DetailButton ref="button" v-on:update-button="updateButton"
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
import { keyboardNavigation } from '../mixins/keyboard-navigation'

export default {
  name: 'ProgramDetail',
  mixins: [keyboardNavigation],
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
/*     updateButton () {
      switch (this.buttons[1]) {
        case 'Enregistrer':
        // this.textButton = 'Annuler l\'enregistrement'
        break
        case 'Annuler l\'enregistrement':
        // this.textButton = 'Enregistrer'
        break
        case 'Recommander':
        // this.textButton = 'Ne plus recommander'
        break
        case 'Ne plus recommander':
        // this.textButton = 'Recommander'
        break
        default:
        console.log(DetailButton)
      }
    }, */
    updateButton: function (arg1, arg2) {
      console.log(arg1, arg2)
    }
  },
  created () {
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
        { name: 'Catch up' }
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
        { name: 'Catch up' }
      ]
      this.eventState.selectedEvent = Object.assign({ buttons: this.buttons }, this.eventState.selectedEvent)
    }
  }
}
</script>

<style lang='less' scoped>
@import "../assets/style-library.less";
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
