<template>
    <nav>
        <ul ref="ul">
            <li ref="now" v-bind:class="{ focus: isFocused }" @click="getEventNow()">now</li>
            <li ref="tonight" v-bind:class="{ focus: isFocused }" @click="getEventTonight()">tonight</li>
            <li v-bind:class="{ focus: isFocused }" @click="toggleCatNavBar()">category</li>
            <li v-bind:class="{ focus: isFocused }">channel</li>
        </ul>
        <ul id="catNavBar">
            <li @click="getEventByCat(100)">émissions</li>
            <li @click="getEventByCat(10 )">films / séries</li>
            <li @click="getEventByCat(50 )">jeunesse</li>
            <li @click="getEventByCat(60 )">spectacle</li>
            <li @click="getEventByCat(90 )">documentaire</li>
            <li @click="getEventByCat(40)">sport</li>
        </ul>
    </nav>
</template>

<script>
import { navigationState } from '../states/navigation-state'
import { keyboardNavigation } from '../mixins/keyboard-navigation'

import { eventState } from '../states/event-state'
import moment from 'moment'
export default {
  name: 'navigationBar',
  mixins: [keyboardNavigation],
  methods: {
    created () {
      this.getEventNow()
    },
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
  },
  data () {
    return {
      navigationState,
      eventState
    }
  }
}
</script>

<style lang="less" scoped>
.focus {
    background-color: chartreuse;
  }
ul, div {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
    }
ul#catNavBar {
    display: none;
    }
ul#catNavBar.open {
    display: block;
    }

li {
    float: left;
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    :focus {
      background-color: #111;
    }
}

</style>
