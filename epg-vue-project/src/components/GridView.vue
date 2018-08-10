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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
main {
  background-color: white;
  display: flex;
}
.row{
  flex-direction: row;
}
</style>
