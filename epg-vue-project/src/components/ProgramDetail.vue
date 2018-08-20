<template>
    <aside id='detail'>
        <span class='close' @click="closeDetail">&times;</span>
        <img src="https://fusion.molotov.tv/arts/m2/224x294/Ch8SHQoUABCYcXst-g-SvGbBGATubTtpbjUSA2pwZxgBCh8IARIbChRwzxG_b6v-8CTE4AfET920jtUAkBIDcG5n/jpg" alt="Program Title" height="300">
        <h4>Program Title</h4>
        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
        <button>Record</button>
        <button>Bookmark</button>
        <button>Start Over</button>
        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
    </aside>
</template>

<script>
import { eventState } from '../states/event-state'
export default {
    name: 'ProgramDetail',
    data () {
        return { eventState }
    },
    methods: {
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
    },
    beforeDestroy () {
        window.removeEventListener('keydown', this.detectEscapeKey)
    }
  }

</script>

<style lang="less" scoped>
#detail {
    position: absolute;
    z-index: 1; /* Sit on top */
    right: 0;
    top: 0;
    width: 25%;
    height: 100%;
    //overflow: auto; /* Enable scroll if needed */
    //background-color: rgba(10, 3, 3, 0); /* Fallback color */
    background-color: rgba(0,0,0,0.8); /* Black w/ opacity */
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
