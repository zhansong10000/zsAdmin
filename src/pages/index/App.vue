<template>
  <div id="app">
    <layout>
      <router-view />
    </layout>
  </div>
</template>

<script>
// 导入样式
import "@/assets/css/common.scss";
import "@/assets/css/zsui.css";
import "@/pages/index/assets/css/base.scss";
import layout from "@/components/layout/layout.vue";
export default {
  name: "App",
  components: {
    layout: layout
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
