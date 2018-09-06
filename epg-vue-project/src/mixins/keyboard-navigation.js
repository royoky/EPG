import { navigationState } from '../states/navigation-state'
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
      k: 0,
      switchRow: 5,
      focusedComponent: 'navbar',
      navigationState
    }
  },
  methods: {
    arrowKeysListener (event) {
      console.log(event.keyCode)
      console.log(this.focusedComponent)
      // Navbar
      if (this.focusedComponent === 'navbar') {
        this.$refs.navbar.$refs.menuelement[this.j].setfocus()
        switch (event.keyCode) {
          case 13: // Enter Key
            const navbarToGrid = new Promise((resolve, reject) => {
              resolve(
                this.runAction(this.$refs.navbar.$refs.menuelement[this.j].category.action)
              )
            })
            navbarToGrid
              .then(result => {
                this.$refs.grid.$refs.card[this.i].setfocus()
                this.focusedComponent = 'grid'
              })
              .catch(error => {
                console.error(error)
              })
            break
          case 39: // Right key
            if (this.j < this.$refs.navbar.$refs.menuelement.length - 1) {
              this.$refs.navbar.$refs.menuelement[this.j + 1].setfocus()
              this.j++
              break
            }
            break
          case 37: // Left key
            if (this.j !== 0) {
              this.$refs.navbar.$refs.menuelement[this.j - 1].setfocus()
              this.j--
              break
            }
            break
        }
      }
      // Program Grid
      if (this.focusedComponent === 'grid') {
        console.log(this.$refs.grid.$refs.card[this.i])
        switch (event.keyCode) {
          case 40: // Down key
            this.$refs.grid.$refs.card[this.i + this.switchRow].setfocus()
            this.i = (this.i + this.switchRow)
            break
          case 38: // Up key
            if (this.i >= this.switchRow) {
              this.$refs.grid.$refs.card[this.i - this.switchRow].setfocus()
              this.i = (this.i - this.switchRow)
            }
            break
          case 39: // Right key
            if (this.i < this.$refs.grid.$refs.card.length - 1) {
              this.$refs.grid.$refs.card[this.i + 1].setfocus()
              this.i++
              break
            }
            break
          case 37: // Left key
            if (this.i !== 0) {
              this.$refs.grid.$refs.card[this.i - 1].setfocus()
              this.i--
              break
            }
            break
          case 27: // Escape Key
            this.i = 0
            this.$refs.navbar.setfocus()
            this.$refs.navbar.$refs.menuelement[this.j].setfocus()
            break
          case 13: // Enter Key
            const gridToDetail = new Promise((resolve, reject) => {
              resolve(
                this.eventState.selectedEvent = this.$refs.grid.$refs.card[this.i].event
              )
            })
            gridToDetail
              .then(result => {
                this.$refs.grid.$refs.detail.$refs.button[this.k].setfocus()
                this.focusedComponent = 'programDetail'
              })
              .catch(error => {
                console.error(error)
              })
            break
        }
      }
      // Program Detail
      if (this.focusedComponent === 'programDetail') {
        switch (event.keyCode) {
          case 39: // Right key
            if (this.k < this.$refs.grid.$refs.detail.$refs.button.length - 1) {
              this.$refs.button[this.k + 1].setfocus()
              this.k++
              break
            }
            break
          case 37: // Left key
            if (this.k !== 0) {
              this.$refs.grid.$refs.detail.$refs.button[this.k - 1].setfocus()
              this.k--
              break
            }
            break
          case 27: // Escape Key
            const detailToGrid = new Promise((resolve, reject) => {
              resolve(
                this.k = 0,
                this.eventState.selectedEvent = null
              )
            })
            detailToGrid
              .then(result => {
                this.$refs.grid.$refs.card[this.i].setfocus()
                this.focusedComponent = 'grid'
              })
              .catch(error => {
                console.error(error)
              })
            break
        }
      }
    },
    setfocus () {
      if (this.$el !== undefined && this.$el instanceof Element) {
        this.$el.setAttribute('tabindex', '1')
        this.$el.focus()
      }
    },
    runAction (action) {
      this[action]()
    }
  }
}
