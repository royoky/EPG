<template>
    <nav>
        <ul>
            <li>now</li>
            <li>tonight</li>
            <li>category</li>
            <li>channel</li>
        </ul>
    </nav>
</template>

<script>
export default {
  name: 'navigationBar'
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
