import { navigationState } from '../states/navigation-state'
// Mixin
// -----------------------------------------------------------------------------
export const keyboardNavigation = {
  props: {
    category: Object,
    event: Object,
    button: String
  },
  data () {
    return {
      cardIndex: 0,
      menuIndex: 0,
      detailButtonIndex: 0,
      submenuIndex: 0,
      switchRow: 5,
      focusedComponent: 'navbar',
      focusedElement: null,
      navigationState
    }
  },
  methods: {
    arrowKeysListener (event) {
      console.log(event.key)
      // Navbar
      if (this.focusedComponent === 'navbar') {
        this.focusedElement = this.$refs.navbar.$refs.menuelement
        this.focusedElement[this.menuIndex].setfocus()
        switch (event.keyCode) {
          case 13: // Enter Key
            if (this.focusedElement[this.menuIndex].category.subcategories == null) {
              const navbarToGrid = new Promise((resolve, reject) => {
                resolve(
                  this.runAction(this.focusedElement[this.menuIndex].category.action)
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
            } else {
              const navbarToSubnav = new Promise((resolve, reject) => {
                resolve(
                  this.runAction(this.focusedElement[this.menuIndex].category.action)
                )
              })
              navbarToSubnav
                .then(result => {
                  this.$refs.navbar.$refs.subnavCat[this.submenuIndex].setfocus()
                  this.focusedComponent = 'subnav'
                })
                .catch(error => {
                  console.error(error)
                })
            }
            break
          case 39: // Right key
            this.menuIndex = this.moveRight(this.menuIndex)
            break
          case 37: // Left key
            this.menuIndex = this.moveLeft(this.menuIndex)
            break
        }
      }
      // Subnav
      if (this.focusedComponent === 'subnav') {
        this.focusedElement = this.$refs.navbar.$refs.subnavCat
        this.focusedElement[this.submenuIndex].setfocus()
        switch (event.keyCode) {
          case 13: // Enter Key
            const subnavbarToGrid = new Promise((resolve, reject) => {
              resolve(
                this.category = this.focusedElement[this.submenuIndex].category,
                this.runAction(this.focusedElement[this.submenuIndex].category.action)
              )
            })
            subnavbarToGrid
              .then(result => {
                this.$refs.grid.$refs.card[this.cardIndex].setfocus()
                this.focusedComponent = 'grid'
              })
              .catch(error => {
                console.error(error)
              })
            break
          case 39: // Right key
            this.submenuIndex = this.moveRight(this.submenuIndex)
            break
          case 37: // Left key
            this.submenuIndex = this.moveLeft(this.submenuIndex)
            break
        }
      }
      // Program Grid
      if (this.focusedComponent === 'grid') {
        this.focusedElement = this.$refs.grid.$refs.card
        switch (event.keyCode) {
          case 40: // Down key
            this.focusedElement[this.cardIndex + this.switchRow].setfocus()
            this.cardIndex = (this.cardIndex + this.switchRow)
            break
          case 38: // Up key
            if (this.cardIndex >= this.switchRow) {
              this.focusedElement[this.cardIndex - this.switchRow].setfocus()
              this.cardIndex = (this.cardIndex - this.switchRow)
            }
            break
          case 39: // Right key
            this.cardIndex = this.moveRight(this.cardIndex)
            break
          case 37: // Left key
            this.cardIndex = this.moveLeft(this.cardIndex)
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
                this.eventState.selectedEvent = Object.assign({ status: this.focusedElement[this.cardIndex].getProgress() }, this.focusedElement[this.cardIndex].event)
              )
            })
            gridToDetail
              .then(result => {
                this.$refs.grid.$refs.detail.$refs.button[this.detailButtonIndex].setfocus()
                this.focusedComponent = 'programDetail'
              })
              .catch(error => {
                console.error(error)
              })
            break
        }
      }
      // Detail
      if (this.focusedComponent === 'programDetail') {
        this.focusedElement = this.$refs.grid.$refs.detail.$refs.button
        switch (event.keyCode) {
          case 39: // Right key
            this.detailButtonIndex = this.moveRight(this.detailButtonIndex)
            break
          case 37: // Left key
            this.detailButtonIndex = this.moveLeft(this.detailButtonIndex)
            break
          case 27: // Escape Key
            const detailToGrid = new Promise((resolve, reject) => {
              resolve(
                this.eventState.selectedEvent = null,
                this.detailButtonIndex = 0
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
    moveLeft (componentIndex) {
      if (componentIndex !== 0) {
        this.focusedElement[componentIndex - 1].setfocus()
        componentIndex--
        return componentIndex
      }
    },
    moveRight (componentIndex) {
      if (componentIndex < this.focusedElement.length - 1) {
        this.focusedElement[componentIndex + 1].setfocus()
        componentIndex++
        return componentIndex
      }
    }
  }
}
