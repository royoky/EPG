<template>
    <nav tabindex="1">
        <ul>
            <li tabindex="-1" @click="getEventNow()"> now</li>
            <li tabindex="-1" @click="getEventTonight()">tonight</li>
<<<<<<< react-details
            <li tabindex="-1" @click="getEventByCat(10)">category</li>
=======
            <li tabindex="-1">category</li>
>>>>>>> now is working and tonight also
            <li tabindex="-1">channel</li>
        </ul>
        <ul v-if="this.navigationState.selectedCategory">
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
import moment from 'moment'
export default {
  name: 'navigationBar',
  methods: {
    async getEventNow () { 
      this.navigationState.selectedCategory = null     
      const events = await fetch('data/GenericEvents.json')
      let listOfEvents = await events.json()
<<<<<<< react-details
      const endNow = moment(this.navigationState.today, 'X').add(1, 'h').format('X')
      listOfEvents = listOfEvents.filter(element => element.start_date > this.navigationState.today && element.start_date < this.navigationState.today + 86400)
      listOfEvents = listOfEvents.filter(element => element.start_date < endNow && element.end_date > this.navigationState.today)
=======
      const now = new Date().getHours()
      function compareHours (timeStamp) {
        let hours = new Date(timeStamp * 1000).getHours()
        return hours === now
      }
      listOfEvents = listOfEvents.filter(element => compareHours(element.start_date))
>>>>>>> now is working and tonight also
      this.navigationState.programList = listOfEvents
    },
    async getEventTonight () {
      const events = await fetch('data/GenericEvents.json')
      let listOfEvents = await events.json()
<<<<<<< react-details
      listOfEvents = listOfEvents.filter(element => element.start_date > this.navigationState.today && element.start_date < this.navigationState.today + 86400)
=======
>>>>>>> now is working and tonight also
      listOfEvents = listOfEvents.filter(element => new Date(element.start_date * 1000).getHours() <= 23 && new Date(element.start_date * 1000).getHours() >= 20)
      this.navigationState.programList = listOfEvents
    },
    async getEventByCat (cat) {
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
      navigationState
    }
  }
}
</script>

<style lang="less" scoped>
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
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
