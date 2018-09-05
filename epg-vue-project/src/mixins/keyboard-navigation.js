// Mixin
// -----------------------------------------------------------------------------
export const keyboardNavigation = {
  props: {
    category: Object,
    event: Object
  },
  data () {
    return {
      i: 0,
      j: 0,
      switchRow: 5,
      isFocused: false,
      focusedComponent: 'navbar',
      eventState: null
    }
  },
  methods: {
    arrowKeysListener (event) {
      console.log(event.keyCode)
      // Navbar
      if (this.focusedComponent === 'navbar') {
        this.$refs.navbar.$refs.menuelement[this.j].setfocus()
        switch (event.keyCode) {
          case 13: // Enter Key
            const navbarPromise = new Promise((resolve, reject) =>  {
              resolve(
                this.runAction(this.$refs.navbar.$refs.menuelement[this.j].category.action),
                this.$refs.navbar.$refs.menuelement[this.j].unsetfocus()
              )
            })
            navbarPromise
            .then (result => {
              this.$refs.grid.$refs.card[this.i].setfocus()
              this.focusedComponent = 'grid'
                })
            .catch(error => {
                console.error(error);
            })
            break
          case 39: // Right key
            if (this.j < this.$refs.navbar.$refs.menuelement.length - 1) {
              this.$refs.navbar.$refs.menuelement[this.j].unsetfocus()
              this.$refs.navbar.$refs.menuelement[this.j + 1].setfocus()
              this.j++
              break
            }
            break
          case 37: // Left key
            if (this.j !== 0) {
              this.$refs.navbar.$refs.menuelement[this.j].unsetfocus()
              this.$refs.navbar.$refs.menuelement[this.j - 1].setfocus()
              this.j--
              break
            }
            break
        }
      }
      // Program Grid
      if (this.focusedComponent === 'grid') {
        console.log(this.$refs.grid.$refs.card.length)
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
            if (this.i < this.$refs.grid.$refs.card.length - 1) {
              this.$refs.grid.$refs.card[this.i].unsetfocus()
              this.$refs.grid.$refs.card[this.i + 1].setfocus()
              this.i++
              break
            }
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
            this.i = 0
            this.$refs.navbar.setfocus()
            this.$refs.navbar.$refs.menuelement[this.j].setfocus()
            break
          case 13: // Enter Key
            this.event = this.$refs.grid.$refs.card[this.i].event
            this.displayDetail()
            break
        }
      }
    },
    setfocus () {
      this.isFocused = true
    },
    unsetfocus () {
      this.isFocused = false
    },
    runAction (action) {
      this[action]()
    },
    displayDetail () {
      this.eventState.selectedEvent = this.event
    }
  }
}
