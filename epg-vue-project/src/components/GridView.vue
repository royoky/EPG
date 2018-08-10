<template>
    <main>
        <Row/>
        <ProgramDetail v-if="eventState.selectedEvent"/>
    </main>
</template>

<script>
import Row from './Row.vue'
import ProgramDetail from './ProgramDetail.vue'
import { eventState } from '../states/event-state'
import { navigationState } from '../states/navigation-state'

export default {
  name: 'GridView',
  components: {
    Row,
    ProgramDetail
  },
  // methods : {
  //   async getEventByCat () {
  //     try {
  //       const categories = await fetch('data/GenericCategories.json')
  //       let listOfCategories = await categories.json()
  //       listOfCategories = listOfCategories.filter(element => element.content_nibble_lvl_1 === this.navigationState.selectedCategory)
  //       listOfCategories = listOfCategories.map(element => element.id)
  //       const events = await fetch('data/GenericEvents.json')
  //       let listOfEvents = await events.json()
  //       listOfEvents =  listOfCategories.forEach(categoryId => {
  //         listOfEvents.find(function (event) {
  //           event.id === categoryId.id
  //         })
  //       })
  //       console.log(listOfEvents)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  // },
  data () {
    return { eventState, navigationState }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
main {
  background-color: white;
}
</style>
