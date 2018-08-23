<template>
  <div id="app1" >
    <router-view />
  </div>
</template>

<script>
  // 导入样式
  import '@/assets/css/zsui.css';
// import '@/assets/css/layui.css';
  //import '@/assets/css/global.css';

  export default {
    name: 'App'
  }
</script>

<style lang="scss" scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
