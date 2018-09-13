<template>
    <nav>
      <MenuElement ref="menuelement"
        v-for="(category, index ) in categories"
        :key="index"
        :category="category"
        />
      <section id="subnavCat" class="subnav" v-if="this.navigationState.catNavbar">
        <MenuElement
          ref="subnavCat"
          v-for="(subcategory, index ) in categories[2].subcategories"
          :key="index"
          :category="subcategory"
        />
      </section>
      <section id="subnavChannel" class="subnav" v-if="this.navigationState.channel">
        <MenuElement
          ref="subnavChannel"
          v-for="(channel, index ) in this.navigationState.channelList"
          :key="index"
          :category="channel"
        />
      </section>
    </nav>
</template>

<script>
import { keyboardNavigation } from '../mixins/keyboard-navigation'
import MenuElement from './MenuElement.vue'
import { displayMenuEvents } from '../mixins/displayMenuEvents'

export default {
  name: 'navigationBar',
  mixins: [keyboardNavigation, displayMenuEvents],
  components: {
    MenuElement
  },
  data () {
    return {
      categories: null
    }
  },
  async created () {
    try {
      let response = await fetch('data/MenuCategories.json')
      this.categories = await response.json()
    } catch (error) {
      console.error(error)
    }
  },
  mounted () {
    this.getEventNow()
  }
}
</script>

<style lang="less" scoped>
@import "../assets/style-library.less";
nav {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  nav div {
    flex-grow: 1;
  }
  section.subnav {
    display: flex;
    width: 100%;
  }
}
</style>
