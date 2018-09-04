<template>
    <div v-bind:class="{ focus: isFocused }">
      {{ category.name }}
    </div>
</template>
<script>
import MenuElement from './MenuElement.vue'
import { keyboardNavigation } from '../mixins/keyboard-navigation'

export default {
  name: 'MenuElement',
  mixins: [keyboardNavigation],
  props: {
    category: Object
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

div {
  display: flex;
  width: 100%;
  color: white;
  border: 1px grey solid;
  text-align: center;
  background-color:#333;
  padding: 20px;
}
.focus {
  background-color: chartreuse !important;
  border: 3px blue solid !important;
}
</style>
