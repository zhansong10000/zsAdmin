<template>
  <div id="app">
    <zs-layout></zs-layout>
  </div>
</template>

<script>
// 导入样式
import "@/assets/css/common.scss";
import "@/assets/css/zsui.css";
import "@/pages/index/assets/css/base.scss";
import zsLayout from "@/components/layout/zsLayout.vue";
export default {
  name: "App",
  components: {
    zsLayout: zsLayout
  }
};
</script>

<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
