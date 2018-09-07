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
      cardIndex: 0,
      menuIndex: 0,
      k: 0,
      submenu: 0,
      switchRow: 5,
      focusedComponent: 'navbar',
      navigationState
    }
  },
  methods: {
    arrowKeysListener (event) {
      console.log(event.keyCode)
      // Navbar
      if (this.focusedComponent === 'navbar') {
        this.$refs.navbar.$refs.menuelement[this.menuIndex].setfocus()
        switch (event.keyCode) {
          case 13: // Enter Key
            if (this.$refs.navbar.$refs.menuelement[this.menuIndex].category.subcategories == null){
              const navbarToGrid = new Promise((resolve, reject) => {
                resolve(
                  this.runAction(this.$refs.navbar.$refs.menuelement[this.menuIndex].category.action)
                )
              })
              navbarToGrid
                .then(result => {
                  this.$refs.grid.$refs.card[this.cardIndex].setfocus()
                  this.focusedComponent = 'grid'
                })
                .catch(error => {
                  console.error(error)
                })
              }
            else {
              const navbarToSubnav = new Promise((resolve, reject) => {
                resolve(
                  this.runAction(this.$refs.navbar.$refs.menuelement[this.menuIndex].category.action)
                )
              })
              navbarToSubnav
                .then(result => {
                  this.$refs.navbar.$refs.subnavCat[this.submenu].setfocus()
                  this.focusedComponent = 'subnav'
                })
                .catch(error => {
                  console.error(error)
                })
            }
            break
          case 39: // Right key
            if (this.menuIndex < this.$refs.navbar.$refs.menuelement.length - 1) {
              this.$refs.navbar.$refs.menuelement[this.menuIndex + 1].setfocus()
              this.menuIndex++
              break
            }
            break
          case 37: // Left key
            if (this.menuIndex !== 0) {
              this.$refs.navbar.$refs.menuelement[this.menuIndex - 1].setfocus()
              this.menuIndex--
              break
            }
            break
        }
      }
      // Program Grid
      if (this.focusedComponent === 'grid') {
        switch (event.keyCode) {
          case 40: // Down key
            this.$refs.grid.$refs.card[this.cardIndex + this.switchRow].setfocus()
            this.cardIndex = (this.cardIndex + this.switchRow)
            break
          case 38: // Up key
            if (this.cardIndex >= this.switchRow) {
              this.$refs.grid.$refs.card[this.cardIndex - this.switchRow].setfocus()
              this.cardIndex = (this.cardIndex - this.switchRow)
            }
            break
          case 39: // Right key
            if (this.cardIndex < this.$refs.grid.$refs.card.length - 1) {
              this.$refs.grid.$refs.card[this.cardIndex + 1].setfocus()
              this.cardIndex++
              break
            }
            break
          case 37: // Left key
            if (this.cardIndex !== 0) {
              this.$refs.grid.$refs.card[this.cardIndex - 1].setfocus()
              this.cardIndex--
              break
            }
            break
          case 27: // Escape Key
            const gridToNavbar = new Promise((resolve, reject) => {
              resolve(
                this.$refs.navbar.$refs.menuelement[this.menuIndex].setfocus(),
                this.cardIndex = 0
              )
            })
            gridToNavbar
              .then(result => {
                this.focusedComponent = 'navbar'
              })
              .catch(error => {
                console.error(error)
              })
            break
          case 13: // Enter Key
            const gridToDetail = new Promise((resolve, reject) => {
              resolve(
                this.eventState.selectedEvent = this.$refs.grid.$refs.card[this.cardIndex].event,
                this.focusedComponent = 'programDetail'
              )
            })
            gridToDetail
              .then(result => {
                this.$refs.grid.$refs.detail.$refs.button[this.k].setfocus()
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
                this.eventState.selectedEvent = null,
                this.k = 0
              )
            })
            detailToGrid
              .then(result => {
                this.$refs.grid.$refs.card[this.cardIndex].setfocus()
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
    },
    leftMove(componentIndex) {
      if (componentIndex !== 0) {
        this.$el[componentIndex - 1].setfocus()
        componentIndex--
      }
    }
  }
}
