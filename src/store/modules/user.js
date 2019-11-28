import Vue from "vue";

const SET_USER_INFO = "SET_USER_INFO"; //添加用户信息
const GET_USER_INFO = "GET_USER_INFO"; //获取用户信息
const REMOVE_USER_INFO = "REMOVE_USER_INFO"; //删除用户信息
const state = {
  userInfo: {}
};
const mutations = {
  [SET_USER_INFO](state, userInfo) {
    window.sessionStorage.removeItem("userInfo");
    window.sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    state.userInfo = userInfo;
  },
  [GET_USER_INFO](state) {
    let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
    state.userInfo = userInfo;
  },
  [REMOVE_USER_INFO](state) {
    window.sessionStorage.removeItem("userInfo");
    state.userInfo = {};
  }
};

const actions = {};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters
};
