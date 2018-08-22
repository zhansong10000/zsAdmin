import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const ADD_NAV_ITEM = 'ADD_NAV_ITEM';
const REMOVE_NAV_ITEM = 'REMOVE_NAV_ITEM';
const SET_CUR_ITEM = 'SET_CUR_ITEM';

const state = {
  navList: [], //导航列表
  curItem:{} //当前选中项
}
const mutations = {
  [ADD_NAV_ITEM](state, item) {
    let isExist = false;
    for (let i = 0; i < state.navList.length; i++) {
      let temp = state.navList[i];
      if (temp.name == item.name) {
        temp.isSelect = true;
        state.curItem = temp;
        isExist = true;
      } else {
        temp.isSelect = false;
      }
      Vue.set(state.navList, i, temp);
    }
    if (state.navList.length == 0 || !isExist) {
      item.isSelect = true;
      state.curItem = item;
      state.navList.push(item);
    }
  },
  [REMOVE_NAV_ITEM](state, itemObj) {
    let item = itemObj.item;
    let index = itemObj.index;
    if(item.isSelect){
      var nextIndex = index-1;
      if(nextIndex<0){
        nextIndex =1 ;
      }
      var nextItem = state.navList[nextIndex];
      if(nextItem){
        nextItem.isSelect = true;
        state.curItem = nextItem
        Vue.set(state.navList, nextIndex, nextItem);
      }else{
        state.curItem = null;
      }
    }
    state.navList.splice(index,1);
  },
  [SET_CUR_ITEM](state, itemObj){
    let item = itemObj.item;
    let index = itemObj.index;
    for(let temp of state.navList){
      temp.isSelect = false;
    }
    item.isSelect = true;
    state.curItem = item;
    Vue.set( state.navList, index, item);
  }
}
const getters = {}
const actions = {}
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
