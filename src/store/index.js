import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const CHOOSE_GOOD = 'CHOOSE_GOOD';
const SUBMIT_ORDER= 'SUBMIT_ORDER';
const OPENID = 'OPENID';

const state = {
  good: "", //商品
  order:"",//订单
  openId:''//openId
}
const mutations = {
  [CHOOSE_GOOD](state,good){
    state.good = good;
  },
  [SUBMIT_ORDER](state,order){
    state.order = order;
  },
  [OPENID](state,openId){
    state.openId = openId;
  }
}

const actions = {

}
export default new Vuex.Store({
  state,
  actions,
  mutations
})
