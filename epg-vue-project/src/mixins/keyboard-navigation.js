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
      navigationState,
      subnavElement: this.category
    }
  },
  methods: {
    arrowKeysListener (event) {
      console.log(event.key)
      // Navbar
      if (this.focusedComponent === 'navbar') {
        this.focusedElement = this.$refs.navbar.$refs.menuelement
        this.focusedElement[this.menuIndex].setfocus()
        switch (event.key) {
          case 'Enter': // Enter Key
            if (this.focusedElement[this.menuIndex].category.subcategories == null) {
              // navbarToGrid
              this.$refs.grid.$refs.card[this.cardIndex].setfocus()
              this.setFocusedComponent('grid')
            } else {
              this.$refs.navbar.$refs.subnav[this.submenuIndex].setfocus()
              this.navigationState.selectedCategory = this.$refs.navbar.$refs.subnav[this.submenuIndex].category
              this.runAction(this.navigationState.selectedCategory.action)
              this.setFocusedComponent('subnav')
            }
            break
          case 'ArrowRight': // Right key
            this.menuIndex = this.moveRight(this.menuIndex)
            this.runAction(this.focusedElement[this.menuIndex].category.action)
            break
          case 'ArrowLeft': // Left key
            this.menuIndex = this.moveLeft(this.menuIndex)
            this.runAction(this.focusedElement[this.menuIndex].category.action)
            break
        }
        return
      }
      // Subnav categories
      if (this.focusedComponent === 'subnav') {
        this.focusedElement = this.$refs.navbar.$refs.subnav
        this.focusedElement[this.submenuIndex].setfocus()
        switch (event.key) {
          case 'Enter': // Enter Key
            //  subnavbarToGrid
            this.$refs.grid.$refs.card[this.cardIndex].setfocus()
            this.setFocusedComponent('grid')
            break
          case 'ArrowRight': // Right key
            this.submenuIndex = this.moveRight(this.submenuIndex)
            this.navigationState.selectedCategory = this.focusedElement[this.submenuIndex].category
            this.runAction(this.navigationState.selectedCategory.action)
            break
          case 'ArrowLeft': // Left key
            this.submenuIndex = this.moveLeft(this.submenuIndex)
            this.navigationState.selectedCategory = this.focusedElement[this.submenuIndex].category
            this.runAction(this.navigationState.selectedCategory.action)
            break
          case 'Backspace': // Back Key
            // subnavToNavbar
            this.$refs.navbar.$refs.menuelement[this.menuIndex].setfocus()
            this.submenuIndex = 0
            this.focusedComponent = 'navbar'
            break
        }
        return
      }
      // Program Grid
      if (this.focusedComponent === 'grid') {
        this.focusedElement = this.$refs.grid.$refs.card
        switch (event.key) {
          case 'ArrowDown': // Down key
            this.focusedElement[this.cardIndex + this.switchRow].setfocus()
            this.cardIndex = (this.cardIndex + this.switchRow)
            break
          case 'ArrowUp': // Up key
            if (this.cardIndex >= this.switchRow) {
              this.focusedElement[this.cardIndex - this.switchRow].setfocus()
              this.cardIndex = (this.cardIndex - this.switchRow)
            }
            break
          case 'ArrowRight': // Right key
            this.cardIndex = this.moveRight(this.cardIndex)
            break
          case 'ArrowLeft': // Left key
            this.cardIndex = this.moveLeft(this.cardIndex)
            break
          case 'Backspace': // Escape Key
            if (this.navigationState.catNavbar || this.navigationState.channel) {
              // gridTosubnav
              this.$refs.navbar.$refs.subnav[this.submenuIndex].setfocus()
              this.cardIndex = 0
              this.focusedComponent = 'subnav'
            } else {
              // gridToNavbar
              this.$refs.navbar.$refs.menuelement[this.menuIndex].setfocus()
              this.cardIndex = 0
              this.focusedComponent = 'navbar'
            }
            break
          case 'Enter': // Enter Key
            // gridToDetail
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
        return
      }
      // Detail
      if (this.focusedComponent === 'programDetail') {
        this.focusedElement = this.$refs.grid.$refs.detail.$refs.button
        switch (event.key) {
          case 'ArrowRight': // Right key
            this.detailButtonIndex = this.moveRight(this.detailButtonIndex)
            break
          case 'ArrowLeft': // Left key
            this.detailButtonIndex = this.moveLeft(this.detailButtonIndex)
            break
          case 'Backspace': // Escape Key
            // detailToGrid
            this.eventState.selectedEvent = null
            this.detailButtonIndex = 0
            this.$refs.grid.$refs.card[this.cardIndex].setfocus()
            this.focusedComponent = 'grid'
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
      } else return componentIndex
    },
    moveRight (componentIndex) {
      if (componentIndex < this.focusedElement.length - 1) {
        this.focusedElement[componentIndex + 1].setfocus()
        componentIndex++
        return componentIndex
      } else return componentIndex
    },
    setFocusedComponent (component) {
      this.focusedComponent = component
    }
  }
}
