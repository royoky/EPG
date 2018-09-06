<template>
    <button v-bind:class="{ focus: isFocused }" >{{ button.name }}</button>
</template>

<script>
import { keyboardNavigation } from '../mixins/keyboard-navigation'

export default {
  name: 'DetailButton',
  mixins: [keyboardNavigation],
  props: {
    button: Object
  }
}
</script>

<style scoped lang="less">
@import "../assets/style-library.less";

  .focus {
    border: 2px @primary-color solid !important;
  }
  </style>
