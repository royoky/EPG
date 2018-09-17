<template>
    <button @click=updateButton()>{{ textButton }}</button>
</template>

<script>
import { keyboardNavigation } from '../mixins/keyboard-navigation'

export default {
  name: 'DetailButton',
  mixins: [keyboardNavigation],
  props: {
    button: String
  },
  data () {
    return {
      textButton: ''
    }
  },
  created () {
    this.textButton = this.button
  },
  methods: {
    updateButton () {
      let clickedButton = this.textButton
      switch (clickedButton) {
        case 'Enregistrer':
          this.textButton = 'Annuler l\'enregistrement'
          break
        case 'Annuler l\'enregistrement':
          this.textButton = 'Enregistrer'
          break
        case 'Recommander':
          this.textButton = 'Ne plus recommander'
          break
        case 'Ne plus recommander':
          this.textButton = 'Recommander'
          break
      }
      this.$emit('update-button', clickedButton)
    }
  }
}
</script>

<style scoped lang="less">
@import "../assets/style-library.less";

  &:focus {
    border: 2px @primary-color solid !important;
    outline: none !important;
  }
  </style>
