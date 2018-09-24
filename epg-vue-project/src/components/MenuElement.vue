<template>
    <div class="menuElt"
      @click="runAction(category.action)">
<!--       <img v-if="(this.navigationState.channel && category.img !== null)"
      :src="getChannelUrl()" :alt="category.id" class="channel"> -->
      <div v-if="(this.navigationState.channel && category.img !== null)" :style="getBackground()" class="channel"/>
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
    },
    getBackground () {
      return 'background-image: url(' + `/data/channelsLogos/${this.category.id}.png` + ');'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/style-library.less";
.menuElt {
  display: flex;
  flex-grow: 1;
  color: white;
  border: 1px grey solid;
  text-align: center;
  background-color:#333;
  justify-content: center;
  padding: 5px;
  span {
    padding: 20px;
  }
  &:focus {
    border: 5px solid @primary-color !important;
    // outline: none !important;
  }
  .channel {
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: center;
    background-size: 80%;
    padding: 30px;
  }
}
</style>
