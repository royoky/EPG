// Mixin
// -----------------------------------------------------------------------------
export const keyboardNavigation = {
  data () {
    return {
      i: 0,
      switchRow: 6
    }
  },
  methods: {
    arrowKeysListener (event) {
      console.log(event.keyCode)
      if (this.$refs.navbar.isFocused){
        console.log(this.$refs.navbar.$refs.now)
          switch (event.keyCode) {
            case 13: // Enter Key
              this.$refs.navbar.unsetfocus()
              this.$refs.grid.setfocus()
              this.$refs.grid.$refs.card[this.i].setfocus()
              break  
            case 39: // Right key
  
            case 37: // Left key

          }

        }
        if (this.$refs.grid.isFocused){
          switch (event.keyCode) {
            case 40: // Down key
              this.$refs.grid.$refs.card[this.i].unsetfocus()
              this.$refs.grid.$refs.card[this.i + this.switchRow].setfocus()
              this.i = (this.i + this.switchRow)
              break
            case 38: // Up key
              if (this.i >= this.switchRow) {
                this.$refs.grid.$refs.card[this.i].unsetfocus()
                this.$refs.grid.$refs.card[this.i - this.switchRow].setfocus()
                this.i = (this.i - this.switchRow)
              }
              break
            case 39: // Right key
              this.$refs.grid.$refs.card[this.i].unsetfocus()
              this.$refs.grid.$refs.card[this.i + 1].setfocus()
              this.i++
              break
            case 37: // Left key
              if (this.i !== 0) {
                this.$refs.grid.$refs.card[this.i].unsetfocus()
                this.$refs.grid.$refs.card[this.i - 1].setfocus()
                this.i--
                break
              }
              break
            case 27: // Escape Key
              this.$refs.grid.unsetfocus()
              this.$refs.grid.$refs.card[this.i].unsetfocus()
              this.$refs.navbar.setfocus()
              break   
            case 13: // Enter Key
              //this.$refs.grid.unsetfocus()
              //this.$refs.grid.$refs.card[this.i].unsetfocus()
              break  
        }
      }
    }
  }
}