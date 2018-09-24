<template>
    <div :id="id" class="container"></div>
</template>
<script>
export default {
  name: 'ProgressBar',
  props: {
    progress: Number,
    timeLeft: Number,
    id: String
  },
  async mounted () {
    const ProgressBar = require('progressbar.js')
    const line = new ProgressBar.Line(`#${this.id}`, {
      color: '#2b71d8',
      trailColor: '#f4f4f4',
      strokeWidth: 3
    })
    line.set(this.progress)
    line.animate(1, {
      duration: this.timeLeft
    })
  }
}

</script>
<style lang="less" scoped>
    div.container {
        width: 100%;
        position: absolute;
        bottom: 26px;
        z-index: 1;
    }
</style>
