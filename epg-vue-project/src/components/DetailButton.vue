<template>
    <button>{{ button.name }}</button>
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
