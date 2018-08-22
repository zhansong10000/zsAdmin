import Vue from 'vue';

const ADD_NAV_ITEM = 'ADD_NAV_ITEM';//添加标签
const REMOVE_NAV_ITEM = 'REMOVE_NAV_ITEM';//移除标签
const REMOVE_OTHER_ITEM = 'REMOVE_OTHER_ITEM';//移除其他标签
const REMOVE_ALL_ITEM = 'REMOVE_ALL_ITEM';//移除全部标签
const SET_CUR_ITEM = 'SET_CUR_ITEM';//设置当前标签


const state = {
  navList: [], //导航列表
  curItem: {} //当前选中项
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
    if (item.isSelect) {
      var nextIndex = index - 1;
      if (nextIndex < 0) {
        nextIndex = 1;
      }
      var nextItem = state.navList[nextIndex];
      if (nextItem) {
        nextItem.isSelect = true;
        state.curItem = nextItem
        Vue.set(state.navList, nextIndex, nextItem);
      } else {
        state.curItem = null;
      }
    }
    state.navList.splice(index, 1);
  },
  [SET_CUR_ITEM](state, itemObj) {
    let item = itemObj.item;
    let index = itemObj.index;
    for (let temp of state.navList) {
      temp.isSelect = false;
    }
    item.isSelect = true;
    state.curItem = item;
    Vue.set(state.navList, index, item);
  },
  [REMOVE_OTHER_ITEM](state) {
    state.navList = [state.curItem];
  },
  [REMOVE_ALL_ITEM]() {
    state.curItem = null;
    state.navList = [];
  }
}

const actions = {}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}
