// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import store from "@/store";
import http from "@/http";
import ElementUI from "element-ui";
import zsui from "@/components/zsui/src";
import "element-ui/lib/theme-chalk/index.css";
//开启debug模式


Vue.config.productionTip = false;
Vue.use(http);
Vue.use(ElementUI);
Vue.use(zsui);
new Vue({
  el: "#app",
  store,
  components: { App },
  template: "<App/>"
});
