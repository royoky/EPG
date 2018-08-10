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
    Row,
    ProgramDetail
  },
  data () {
    return { eventState }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
main {
  background-color: white;
  position: relative;
}
</style>
