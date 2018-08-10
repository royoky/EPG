<template>
    <nav tabindex="1">
        <ul>
            <li tabindex="-1"> now</li>
            <li tabindex="-1">tonight</li>
            <li tabindex="-1">category</li>
            <li tabindex="-1">channel</li>
        </ul>
        <ul>
            <li @click="selectCategory(100)">100</li>
            <li @click="selectCategory(10 )">10</li>
            <li @click="selectCategory(50 )">50</li>
            <li @click="selectCategory(60 )">60</li>
            <li @click="selectCategory(90 )">90</li>
            <li @click="test()">40</li>
        </ul>
    </nav>
</template>

<script>
import { navigationState } from '../states/navigation-state'
export default {
  name: 'navigationBar',
  methods: {
    async test () {
        this.selectCategory(40)
        await this.getEventByCat()
    },
    selectCategory (cat) {
      this.navigationState.selectedCategory = cat
      console.log(this.navigationState.selectedCategory)
    },
    async getEventByCat () {
      try {
         const categories = await fetch('data/GenericCategories.json')
        let listOfCategories = await categories.json()
        listOfCategories = listOfCategories.filter(element => element.content_nibble_lvl_1 === this.navigationState.selectedCategory)
        listOfCategories = listOfCategories.map(element => element.id)
        const events = await fetch('data/GenericEvents.json')
        let listOfEvents = await events.json()
        listOfEvents =  listOfCategories.map(element => {
         return listOfEvents.filter(event => event.category_id === element)
        })
        listOfEvents = listOfEvents.filter(element => element.length > 0)
        console.log(listOfEvents)
        let newList = []
        listOfEvents.map(element => {
          console.log(`l'élement : ${element} est concatené à ${newList}, ce qui donne : ${element.concat(newList)}`)
          return newList = element.concat(newList)
        })
        console.log(newList);
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
