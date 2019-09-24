<template>
  <div class="main-page">
    <div class="search_panel"></div>
    <div class="search_list"></div>
  </div>
</template>
<script>
import Vue from "vue";
import { zsMessage } from "@/components/zsui/src";

export default {
  name: "pageDialog",
  data() {
    return {
      dialogVisible: false
    };
  },
  mounted() {
    console.log("list mounted");
  },
  methods: {
    go() {
      this.$router.push({ path: "/aa" });
    }
  }
};
</script>
<style>
</style>
