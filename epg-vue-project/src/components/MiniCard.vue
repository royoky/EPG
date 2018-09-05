<template>
    <div class="minicard">
        {{event.name}}
    </div>
</template>
<script>
export default {
  name: 'MiniCard',
  props: {
    event: { type: Object, required: true }
  },
  mounted () {
    const miniCards = document.querySelectorAll('.minicard')
    const percent = ((this.event.end_date - this.event.start_date) / 36)
    if (miniCards != null) {
      Array.prototype.map.call(miniCards, (obj) => {
        obj.style.setProperty('width', percent + '%')
      })
    }
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
@import "../assets/style-library.less";
    div.minicard {
        background-color: @primary-color;
        color: #ffffff;
        display: inline-block;
    }
</style>
