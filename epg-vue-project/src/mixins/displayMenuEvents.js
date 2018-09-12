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
      this.navigationState.catNavbar = !this.navigationState.catNavbar
    },
    getChannels () {
      this.navigationState.channel = !this.navigationState.channel
    },
    getEventByChannel (channelNumber) {
      let listOfEvents = this.navigationState.programAll
      let listOfChannels = this.navigationState.channelList
      const channel = listOfChannels.find(element => element.number === channelNumber)
      listOfEvents = listOfEvents.filter(element => element.service_id === channel.id)
      listOfEvents.sort(function (a, b) {
        return a.start_date - b.start_date
      })
      return listOfEvents
    },
    getEventNow () {
      if (eventState.selectedEvent) {
        eventState.selectedEvent = null
      }
      let listOfEvents = this.navigationState.programAll
      const endNow = moment(this.navigationState.today, 'X').add(1, 'h').format('X')
      this.navigationState.programList = listOfEvents.filter(element => element.start_date < endNow && element.end_date > this.navigationState.today)
    },
    getEventTonight () {
      if (eventState.selectedEvent) {
        eventState.selectedEvent = null
      }
      let listOfEvents = this.navigationState.programAll
      const aDayLater = moment(this.navigationState.today, 'X').add(1, 'd').format('X')
      listOfEvents = listOfEvents.filter(element => element.start_date > this.navigationState.today && element.start_date < aDayLater)
      listOfEvents = listOfEvents.filter(element => new Date(element.start_date * 1000).getHours() <= 23 && new Date(element.start_date * 1000).getHours() >= 20)
      this.navigationState.programList = listOfEvents
    },
    getEventByCat () {
      if (eventState.selectedEvent) {
        eventState.selectedEvent = null
      }
      this.navigationState.selectedCategory = this.category.code
      try {
        let listOfCategories = this.navigationState.categoryList
        listOfCategories = listOfCategories.filter(element => element.content_nibble_lvl_1 === this.navigationState.selectedCategory)
        listOfCategories = listOfCategories.map(element => element.id)
        let listOfEvents = this.navigationState.programAll
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
