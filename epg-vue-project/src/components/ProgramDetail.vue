<template>
    <aside id='detail'>
        <img src="https://fusion.molotov.tv/v1/magik/?vignette=99ff4864c44db98cfc0140fbe304c4ad9af18b48.jpg&size=446x588&overlay1=49788638ca37ebc06a3c02f6d560a348b450a188" alt="Program Title" height="300">
        <h4>Program Title</h4>
        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
        <button>Record</button>
        <button>Bookmark</button>
        <button>Start Over</button>
        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
    </aside>
</template>

<script>
export default {
    name: 'Detail'
}
</script>

<style lang="less" scoped>
#detail {
    /*display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    right: 0;
    top: 0;
    width: 25%; /* Full width */
    height: 100%; /* Full height */
    //overflow: auto; /* Enable scroll if needed */
    background-color: rgba(10, 3, 3, 0); /* Fallback color */
    background-color: rgba(0,0,0,0.8); /* Black w/ opacity */
}
</style>
