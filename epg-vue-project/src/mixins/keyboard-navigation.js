// Mixin
// -----------------------------------------------------------------------------
export const keyboardNavigation = {
  data () {
    return {
      isFocused: false
    }
  },
  methods: {
    $keyListener ({ keyCode }) {
      switch (keyCode) {
        // Up key
        case 38:
          return this.$movePositionInGrid(0, -1)
        // Right key
        case 39:
          return this.$movePositionInGrid(1, 0)
        // Down key
        case 40:
          return this.$movePositionInGrid(0, 1)
        // Left key
        case 37:
          return this.$movePositionInGrid(-1, 0)
      }
    },
    $setFocus () {
      this.isFocused = true
    },
    $removeFocus () {
      this.isFocused = false
    }
  }
}
