import Vue from "vue";
import Vuex from "vuex";
import nav from "./modules/nav";
import common from "./modules/common";
import user from "./modules/user";
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    nav,
    common,
    user
  }
});
