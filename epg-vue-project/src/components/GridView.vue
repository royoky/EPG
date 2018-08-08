<template>
    <main>
        <Row
          />
    </main>
</template>

<script>
import Row from './Row.vue'

export default {
  name: 'GridView',
  components: {
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
main {
  background-color: white;
}
</style>
