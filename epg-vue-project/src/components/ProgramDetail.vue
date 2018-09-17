<template>
    <div id='detail'>
      <div id='background' :style="getBackground()"/>
        <span class='close' @click="closeDetail">&times;</span>
        <div id='imgContainer'>
          <img :src="getUrl()" :alt="eventState.selectedEvent.name">
          <img :src="getChannelUrl()" :alt="eventState.selectedEvent.service_id" id='channel'>
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
import { navigationState } from '../states/navigation-state'

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
      buttons: {
        PastReco: ['Catch up', 'Recommander'],
        PastNotReco: ['Catch up', 'Ne plus recommander'],
        NowRecoSave: ['Catch up', 'Recommander', 'Enregistrer', 'Play'],
        NowNotRecoSave: ['Catch up', 'Ne plus recommander', 'Enregistrer', 'Play'],
        NowNotRecoNotSave: ['Catch up', 'Ne plus recommander', 'Annuler l\'enregistrement', 'Play'],
        NowRecoNotSave: ['Catch up', 'Recommander', 'Annuler l\'enregistrement', 'Play'],
        FutureRecoSave: ['Recommander', 'Enregistrer'],
        FutureNotRecoSave: ['Ne plus recommander', 'Enregistrer'],
        FutureNotRecoNotSave: ['Ne plus recommander', 'Annuler l\'enregistrement'],
        FutureRecoNotSave: ['Recommander', 'Annuler l\'enregistrement']
      },
      navigationState }
  },
  methods: {
    getUrl () {
      return `/data/${eventState.selectedEvent.image}`
    },
    getBackground () {
      return 'background-image: url(' + `/data/${eventState.selectedEvent.image}` + ');'
    },
    getChannelUrl () {
      return `/data/channelsLogos/${eventState.selectedEvent.service_id}.png`
    },
    closeDetail () {
      eventState.selectedEvent = null
    },
    getButtons () {
      if (eventState.selectedEvent.status > 1) {
        if (eventState.selectedEvent.bookmarked === false) {
          this.eventState.selectedEvent = Object.assign({ buttons: this.buttons.PastReco }, this.eventState.selectedEvent)
        } else {
          this.eventState.selectedEvent = Object.assign({ buttons: this.buttons.PastNotReco }, this.eventState.selectedEvent)
        }
      } else if (eventState.selectedEvent.status < 0) {
        if (eventState.selectedEvent.bookmarked === false && eventState.selectedEvent.recorded === false) {
          this.eventState.selectedEvent = Object.assign({ buttons: this.buttons.FutureRecoSave }, this.eventState.selectedEvent)
        } else if (eventState.selectedEvent.bookmarked === true && eventState.selectedEvent.recorded === false) {
          this.eventState.selectedEvent = Object.assign({ buttons: this.buttons.FutureNotRecoSave }, this.eventState.selectedEvent)
        } else if (eventState.selectedEvent.bookmarked === true && eventState.selectedEvent.recorded === true) {
          this.eventState.selectedEvent = Object.assign({ buttons: this.buttons.FutureNotRecoNotSave }, this.eventState.selectedEvent)
        } else if (eventState.selectedEvent.bookmarked === false && eventState.selectedEvent.recorded === true) {
          this.eventState.selectedEvent = Object.assign({ buttons: this.buttons.FutureRecoNotSave }, this.eventState.selectedEvent)
        }
      } else if (eventState.selectedEvent.status > 0 && eventState.selectedEvent.status < 1) {
        if (eventState.selectedEvent.bookmarked === false && eventState.selectedEvent.recorded === false) {
          this.eventState.selectedEvent = Object.assign({ buttons: this.buttons.NowRecoSave }, this.eventState.selectedEvent)
        } else if (eventState.selectedEvent.bookmarked === true && eventState.selectedEvent.recorded === false) {
          this.eventState.selectedEvent = Object.assign({ buttons: this.buttons.NowNotRecoSave }, this.eventState.selectedEvent)
        } else if (eventState.selectedEvent.bookmarked === true && eventState.selectedEvent.recorded === true) {
          this.eventState.selectedEvent = Object.assign({ buttons: this.buttons.NowNotRecoNotSave }, this.eventState.selectedEvent)
        } else if (eventState.selectedEvent.bookmarked === false && eventState.selectedEvent.recorded === true) {
          this.eventState.selectedEvent = Object.assign({ buttons: this.buttons.NowRecoNotSave }, this.eventState.selectedEvent)
        }
      }
    },
    updateButton: (buttonName) => {
      let ind = navigationState.programAll.findIndex(program => {
        return program.id === eventState.selectedEvent.id
      })
      switch (buttonName) {
        case 'Enregistrer':
          navigationState.programAll[ind].recorded = true
          eventState.selectedEvent.recorder = true
          break
        case 'Annuler l\'enregistrement':
          navigationState.programAll[ind].recorded = false
          eventState.selectedEvent.recorder = false
          break
        case 'Recommander':
          navigationState.programAll[ind].bookmarked = true
          console.log('bookmarked')
          break
        case 'Ne plus recommander':
          navigationState.programAll[ind].bookmarked = false
          break
      }
    }
  },
  created () {
    this.getButtons()
  },
  beforeUpdate () {
    this.getButtons()
  }
}
</script>

<style lang='less' scoped>
@import "../assets/style-library.less";
//variables
// @channelURL:
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
  justify-content: center;

  #background {
    position: absolute;
    top:0;
    right: 0;
    left: 0;
    bottom: 0;
    background-size: cover;
    filter: blur(5px);
    z-index: 0;
    // background: #000 no-repeat center center;
    // background-color: rgb(0, 0, 0);
    // background-image: none;
    // background-size: auto auto;
  }

  p {
    text-align: justify;
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

  #imgContainer {
    position: relative;
    z-index: 1;
  }

  #detailsContainer {
    width: 600px;
    padding: 20px;
    text-align: left;
    padding: 20px;
    z-index: 1;
  }

  #channel {
    position: absolute;
    top: 5px;
    right: 5px;
  }
}
</style>
