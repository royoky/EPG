// Mixin
// -----------------------------------------------------------------------------
import { eventState } from '../states/event-state'
import moment from 'moment'
import { navigationState } from '../states/navigation-state'


export const displayMenuEvents = {
  data () {
    return {
      eventState: null,
      navigationState
    }
  },
  methods: {
    toggleCatNavBar () {
      document.querySelector('#catNavBar').classList.toggle('open')
    },
    async getEventNow () {
      if (eventState.selectedEvent) {
        eventState.selectedEvent = null
      }
      this.toggleCatNavBar()
      document.querySelector('#catNavBar').classList.remove('open')
      const events = await fetch('data/GenericEvents.json')
      let listOfEvents = await events.json()
      const endNow = moment(this.navigationState.today, 'X').add(1, 'h').format('X')
      listOfEvents = listOfEvents.filter(element => element.start_date < endNow && element.end_date > this.navigationState.today)
      this.navigationState.programList = listOfEvents
    },
    async getEventTonight () {
      if (eventState.selectedEvent) {
        eventState.selectedEvent = null
      }
      this.toggleCatNavBar()
      document.querySelector('#catNavBar').classList.remove('open')
      const events = await fetch('data/GenericEvents.json')
      let listOfEvents = await events.json()
      const aDayLater = moment(this.navigationState.today, 'X').add(1, 'd').format('X')
      listOfEvents = listOfEvents.filter(element => element.start_date > this.navigationState.today && element.start_date < aDayLater)
      listOfEvents = listOfEvents.filter(element => new Date(element.start_date * 1000).getHours() <= 23 && new Date(element.start_date * 1000).getHours() >= 20)
      this.navigationState.programList = listOfEvents
    },
    async getEventByCat (cat) {
      if (eventState.selectedEvent) {
        eventState.selectedEvent = null
      }
      this.navigationState.selectedCategory = cat
      try {
        const categories = await fetch('data/GenericCategories.json')
        let listOfCategories = await categories.json()
        listOfCategories = listOfCategories.filter(element => element.content_nibble_lvl_1 === this.navigationState.selectedCategory)
        listOfCategories = listOfCategories.map(element => element.id)
        const events = await fetch('data/GenericEvents.json')
        let listOfEvents = await events.json()
        listOfEvents = listOfCategories.map(element => {
          return listOfEvents.filter(event => event.category_id === element)
        })
        listOfEvents = listOfEvents.filter(element => element.length > 0)
        let newList = []
        listOfEvents.map(element => {
          newList = element.concat(newList)
        })
        newList.sort(function (a, b) {
          return a.start_date - b.start_date
        })
        this.navigationState.programList = newList
      } catch (error) {
        console.log(error)
      }
    }
  }
}
