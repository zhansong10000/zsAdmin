import Vue from "vue";

const UPDATE_DOCUMENT_HEIGHT = "UPDATE_DOCUMENT_HEIGHT"; //计算页面高度
const UPDATE_CONTENT_HEIGHT = "UPDATE_CONTENT_HEIGHT"; //计算内容页面高度
const UPDATE_TABLE_HEIGHT = "UPDATE_TABLE_HEIGHT"; //计算表格高度
const state = {
  documentClientHeight: 0,
  contentHeight: 0,
  tableHeight: 0
};
const mutations = {
  [UPDATE_DOCUMENT_HEIGHT](state, height) {
    state.documentClientHeight = height;
  },
  [UPDATE_CONTENT_HEIGHT](state, height) {
    state.contentHeight = height;
  },
  [UPDATE_TABLE_HEIGHT](state, height) {
    state.tableHeight = height;
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
