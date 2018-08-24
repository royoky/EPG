<template>
    <nav tabindex="1">
        <ul>
            <li tabindex="-1"> now</li>
            <li tabindex="-1">tonight</li>
            <li tabindex="-1">category</li>
            <li tabindex="-1">channel</li>
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
export default {
  name: 'navigationBar',
  methods: {
    async getEventByCat (cat) {
      this.navigationState.selectedCategory = cat
      console.log(this.navigationState.selectedCategory)
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
        console.log(newList)
        this.navigationState.programList = newList
        console.log(this.navigationState.programList)
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
