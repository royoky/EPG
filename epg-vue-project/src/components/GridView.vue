<template>
    <main>
        <Row v-for="n in 10"
        :key="n.id"/>         
    </main>
</template>

<script>
import Row from './Row.vue'

export default {
  name: 'GridView',
  components: {
    Row
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
main {
  background-color: white;
  display: flex;
}
</style>
