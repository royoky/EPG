<template>
    <div id='detail'>
        <span class='close' @click="closeDetail">&times;</span>
        <img src="https://fusion.molotov.tv/arts/m2/224x294/Ch8SHQoUABCYcXst-g-SvGbBGATubTtpbjUSA2pwZxgBCh8IARIbChRwzxG_b6v-8CTE4AfET920jtUAkBIDcG5n/jpg" alt="Alt Title" height="300">
        <h4>{{ eventState.selectedEvent.name }}</h4>
        <p>"Lorem"</p>
        <button>Record</button>
        <button>Bookmark</button>
        <button>Start Over</button>
        <p>"{{ eventState.selectedEvent.description }}</p>
    </div>
</template>

<script>
import { eventState } from '../states/event-state';
export default {
  name: 'ProgramDetail',
  props: {
    event: Object
  },
  data() {
    return { eventState };
  },
  methods: {
    closeDetail() {
      eventState.selectedEvent = null;
    },
    // Function to detect the Escape key and close the detail window
    detectEscapeKey(event) {
      if (event.keyCode === 27) {
        this.closeDetail();
      }
    }
  },
  created() {
    window.addEventListener('keydown', this.detectEscapeKey);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.detectEscapeKey);
  }
};
</script>

<style lang='less' scoped>

  div#detail {
  width: 100%;
  height: 400px;
  overflow: auto; /* Enable scroll if needed */
  background-color: black;
  //background-color: rgba(0,0,0,0.8); /* Black w/ opacity */
  // The Close Button
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
}
</style>
