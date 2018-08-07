<template>
    <div>
      <Card/>
    </div>
</template>
<script>
import Card from './Card.vue'

export default {
  name: 'Row',
  components: {
    Card
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

div {
  background-color:white;
}

</style>
