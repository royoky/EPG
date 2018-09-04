<template>
    <div id="container"></div>
</template>
<script>
// import progressBar from 'progressbar.js'
export default {
  name: 'ProgressBar',
  props: {
    progress: Number,
    timeLeft: Number
  },
  async created () {
    const ProgressBar = require('progressbar.js')
    const line = new ProgressBar.Line('#container', {
      color: '#3a3a3a',
      trailColor: '#f4f4f4'
    })
    line.set(this.progress)
    line.animate(1, {
      duration: this.timeLeft
    })
  }
}

</script>
<style lang="less" scoped>
    div#container {
        width: 100%;
        height: 10px;
    }
</style>
