<template>
    <nav>
      <MenuElement ref="menuelement"
        v-for="(category, index ) in categories"
        :key="index"
        :category="category"
        />
      <ul id="catNavBar">
        <li @click="getEventByCat(100)">émissions</li>
        <li @click="getEventByCat(10 )">films / séries</li>
        <li @click="getEventByCat(50 )">jeunesse</li>
        <li @click="getEventByCat(60 )">spectacle</li>
        <li @click="getEventByCat(90 )">documentaire</li>
        <li @click="getEventByCat(40)">sport</li>
      </ul>
      <ul>
        <li v-if="navigationState.channel"
          v-for="(channel, index ) in navigationState.channelList"
          :key="index"
          :channel="channel"
          @click="getEventByChannel(channel.number)">
          {{channel.name}}
        <li/>
      </ul>
    </nav>
</template>

<script>
import { keyboardNavigation } from '../mixins/keyboard-navigation'
import MenuElement from './MenuElement.vue'
import { displayMenuEvents } from '../mixins/displayMenuEvents'
import { navigationState } from '../states/navigation-state'

export default {
  name: 'navigationBar',
  mixins: [keyboardNavigation, displayMenuEvents],
  components: {
    MenuElement
  },
  data () {
    return {
      categories: null,
      navigationState
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
}
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
    }
ul#catNavBar {
    display: none;
    }
ul#catNavBar.open {
    display: block;
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
