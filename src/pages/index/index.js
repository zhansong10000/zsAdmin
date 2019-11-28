// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import store from "@/store";
import router from "./router";
import http from "@/http";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import zsui from "@/components/zsui/src";
import "@/assets/css/common.scss";
import "@/assets/css/zsui.css";
import install from "@/utils/install"

//开启debug模式
Vue.config.productionTip = false;
Vue.use(http);
Vue.use(ElementUI);
Vue.use(zsui);
Vue.use(install);
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
