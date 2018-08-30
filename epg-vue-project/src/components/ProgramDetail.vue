<template>
    <div id='detail'>
        <span class='close' @click="closeDetail">&times;</span>
        <div id='imgContainer'>
        <img :src=getUrl() alt="Alt Title" height="300">
        </div>
        <div>
          <h3>{{ eventState.selectedEvent.name }}</h3>
          <p>"{{ eventState.selectedEvent.description }}</p>
          <button>Record</button>
          <button>Bookmark</button>
        </div>
          <button>Start Over</button>
    </div>
</template>

<script>
import { eventState } from '../states/event-state'
export default {
  name: 'ProgramDetail',
  props: {
    event: Object
  },
  data () {
    return { eventState }
  },
  methods: {
    getUrl () {
      return `/data/${eventState.selectedEvent.image}`
    },
    closeDetail() {
      eventState.selectedEvent = null;
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
  //overflow: auto; /* Enable scroll if needed */
  background-color: black;
  display: flex;
  flex-grow:1;
  color: white;
  //background-color: rgba(0,0,0,0.8); /* Black w/ opacity */
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
