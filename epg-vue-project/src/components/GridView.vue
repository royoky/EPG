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

export default {
  name: 'GridView',
  components: {
<<<<<<< HEAD
    Row
  },
  async created () {
    try {
      this.loading = true
      const response = await fetch('data/GenericCategories.json')
      this.movies = await response.json()
      let list = this.movies.map(element => {
        return { content_nibble_lvl_1: element.content_nibble_lvl_1 }
      })
      list.sort()
      const reduce = list.reduce((categories, movie) => {
        !categories.includes(movie.content_nibble_lvl_1) && categories.push(movie.content_nibble_lvl_1)
        return categories
      }, [])
      console.log(reduce)
    } catch (error) {
      console.log(error)
    } finally {
      this.loading = false
    }
  },
  data () {
    return {
      movies: null,
      loading: false
    }
=======
    Row,
    ProgramDetail
  },
  data () {
    return { eventState }
>>>>>>> 00cb5e38738aa5d34e754e5831f0ad13640ef53b
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
main {
  background-color: white;
}
</style>
