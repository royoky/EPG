<template>
    <div>
        <img>
    </div>
</template>

<script>
export default {
  name: 'Card'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

div {
  width: 224px;
  height: 294px;
  background-color:dimgray;
}
img {
  max-width: 100%;
  border: 1px solid black;
  border-radius: 5%;
  transition: transform 2s;
  &:hover {
    border: 2px solid yellow;
  }
}
</style>
