<template>
    <button :class="{ focus: isFocused }" @click=updateButton()>{{ textButton }}</button>
</template>

<script>
import { keyboardNavigation } from '../mixins/keyboard-navigation'

export default {
  name: 'DetailButton',
  mixins: [keyboardNavigation],
  props: {
    button: Object
  },
  data () {
    return {
      textButton: ''
    }
  },
  created () {
    this.textButton = this.button.name
  },
  methods: {
    updateButton () {
      let clickedButton = this.textButton
      let newButton
      switch (clickedButton) {
        case 'Enregistrer':
        this.textButton = 'Annuler l\'enregistrement'
        newButton = this.button
        break
        case 'Annuler l\'enregistrement':
        this.textButton = 'Enregistrer'
        newButton = this.button
        break
        case 'Recommander':
        this.textButton = 'Ne plus recommander'
        newButton = this.button
        break
        case 'Ne plus recommander':
        this.textButton = 'Recommander'
        newButton = this.button
        break
      }
      this.$emit('update-button', clickedButton, newButton)
    }
  }
}
</script>

<style scoped lang="less">
@import "../assets/style-library.less";

  .focus {
    border: 2px @primary-color solid !important;
  }
  </style>
