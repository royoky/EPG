<template>
    <div
      @click="runAction(category.action)">
      {{ category.name }}
    </div>
</template>
<script>
import { keyboardNavigation } from '../mixins/keyboard-navigation'
import { displayMenuEvents } from '../mixins/displayMenuEvents'

export default {
  name: 'MenuElement',
  mixins: [keyboardNavigation, displayMenuEvents]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/style-library.less";
div {
  flex-grow: 1;
  // display: flex;
  // width: 100%;
  color: white;
  border: 1px grey solid;
  text-align: center;
  background-color:#333;
  padding: 20px;
  &:focus {
    border: 3px solid @primary-color !important;
  }
}
.focus {
  background-color: chartreuse !important;
  border: 3px blue solid !important;
}
</style>
