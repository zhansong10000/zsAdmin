import Vue from "vue";
import Vuex from "vuex";
import nav from "./modules/nav";
import common from "./modules/common";
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    nav,
    common
  }
});
