<template>
    <div
      @click="runAction(category.action)">
      <img v-if="(this.navigationState.channel && category.img !== null)"
      :src="getChannelUrl()" :alt="category.id" class="channel">
      <span v-if="(!(this.navigationState.channel && category.img !== null))">{{ category.name }}</span>
    </div>
</template>
<script>
import { keyboardNavigation } from '../mixins/keyboard-navigation'
import { displayMenuEvents } from '../mixins/displayMenuEvents'

export default {
  name: 'MenuElement',
  mixins: [keyboardNavigation, displayMenuEvents],
  methods: {
    getChannelUrl () {
      return `/data/channelsLogos/${this.category.id}.png`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/style-library.less";
div {
  display: flex;
  flex-grow: 1;
  color: white;
  border: 1px grey solid;
  text-align: center;
  background-color:#333;
  padding: 30px;
  justify-content: center;
  &:focus {
    border: 5px solid @primary-color !important;
    outline: none !important;
  }
}
</style>
