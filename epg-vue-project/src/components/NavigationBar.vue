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
            <li>10</li>
            <li>50</li>
            <li>60</li>
            <li>90</li>
            <li>40</li>
        </ul>
    </nav>
</template>

<script>
import { category } from '../states/navigationState'
export default {
  name: 'navigationBar',
  methods: {
      selectCategory(cat) {
        this.selectedCat = cat
        console.log(this.selectedCat);
        
      }
  },
  data () {
    return {
      category,
      loading: false
    }
  },
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
