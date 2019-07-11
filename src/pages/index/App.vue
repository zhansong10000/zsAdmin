<template>
  <div id="app" >
    <router-view />
  </div>
</template>

<script>

  // 导入样式
  import '@/assets/css/zsui.css';
  import '@/assets/css/animate.css';

  export default {
    name: 'App'
  }
</script>

<style lang="scss" scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
