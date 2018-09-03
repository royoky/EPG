<template>
    <nav>
        <ul ref="ul">
            <li ref="now" v-bind:class="{ focus: isFocused }">now</li>
            <li ref="tonight" v-bind:class="{ focus: isFocused }">tonight</li>
            <li v-bind:class="{ focus: isFocused }">category</li>
            <li v-bind:class="{ focus: isFocused }">channel</li>
        </ul>
        <ul>
            <li @click="getEventByCat(100)">100</li>
            <li @click="getEventByCat(10 )">10</li>
            <li @click="getEventByCat(50 )">50</li>
            <li @click="getEventByCat(60 )">60</li>
            <li @click="getEventByCat(90 )">documentaire</li>
            <li @click="getEventByCat(40)">sport</li>
        </ul>
    </nav>
</template>

<script>
import { navigationState } from '../states/navigation-state'
import { keyboardNavigation } from '../mixins/keyboard-navigation'

export default {
  name: 'navigationBar',
  mixins: [keyboardNavigation],
  data () {
    return {
      navigationState
    }
  },
  methods: {
    async getEventNow () {
      const events = await fetch('data/GenericEvents.json')
      let listOfEvents = await events.json()
      const now = new Date().getHours()
      function compareHours (timeStamp) {
        let hours = new Date(timeStamp * 1000).getHours()
        return hours === now
      }
      listOfEvents = listOfEvents.filter(element => !compareHours(element.start_date))
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
    // setfocus () {
    //   this.isFocused = true
    // },
    // unsetfocus () {
    //   this.isFocused = false
    // }
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
