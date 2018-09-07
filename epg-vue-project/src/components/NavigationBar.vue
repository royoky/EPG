<template>
    <nav>
      <MenuElement ref="menuelement"
        v-for="(category, index ) in categories"
        :key="index"
        :category="category"
        />
      <section id="submenu" v-if="this.navigationState.catNavbar">
        <MenuElement
          ref="subnavCat"
          v-for="(subcategory, index ) in categories[2].subcategories"
          :key="index"
          :category="subcategory"
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
    this.setfocus()
    this.getEventNow()
  }
}
</script>

<style lang="less" scoped>
@import "../assets/style-library.less";
.focus {
    background-color: @primary-color;
  }
nav {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  nav div {
    flex-grow: 1;
  }
  section#submenu {
    display: flex;
    width: 100%;
  }
}
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
    }
// ul#catNavBar {
//     display: none;
//     }
// ul#catNavBar.open {
//     display: block;
//     }
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
