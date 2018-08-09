<template>
    <nav tabindex="1">
        <ul>
            <li tabindex="-1"> now</li>
            <li tabindex="-1">tonight</li>
            <li tabindex="-1">category</li>
            <li tabindex="-1">channel</li>
        </ul>
        <ul>
            <li @click="selectCategory(100)">100</li>
            <li @click="selectCategory(10 )">10</li>
            <li @click="selectCategory(50 )">50</li>
            <li @click="selectCategory(60 )">60</li>
            <li @click="selectCategory(90 )">90</li>
            <li @click="selectCategory(40 )">40</li>
        </ul>
    </nav>
</template>

<script>
import { navigationState } from '../states/navigation-state'
export default {
  name: 'navigationBar',
  methods: {
    selectCategory (cat) {
      this.navigationState.selectedCategory = cat
      console.log(this.navigationState.selectedCategory)
    }
  },
  data () {
    return {
      navigationState
    }
  }
}
</script>

<style lang="less" scoped>
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
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
