<template>
  <div class="zs_head">
    <div class="head-left">后台管理系统</div>
    <div class="head-right">
      <em></em>
      <div class="user-info" @mouseenter="showPanl=true" @mouseleave="showPanl=false">
        张三三
        <span class="head-icon-down"></span>
        <ul class="head-tabs show-layer-fadeIn" :class="{'zs-show':showPanl}">
          <li class="tab-item">aaaaaaaaa</li>
          <li class="tab-item">bbbbbbbb</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "zs-head",
  data() {
    return {
      showPanl: false
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.zs_head {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  .head-left {
    float: left;
    clear: both;
    display: flex;
    align-items: center;
    padding-left: 15px;
    font-size:24px;
    font-weight: 600;
    color: #fff;
  }
  .head-right {
    float: right;
    display: flex;
    align-items: center;
    padding-right: 15px;
    em {
      width: 40px;
      height: 40px;
      margin-right: 15px;
      display: inline-block;
      background-size: 100%;
      background-image: url("../../assets/image/user_head_logo.png");
    }
    .user-info {
      position: relative;
      display: flex;
      cursor: pointer;
      color: #fff;
      font-weight: 400;
      font-size: 15px;
      height: 100%;
      align-items: center;
    }
    .head-icon-down {
      content: "";
      width: 0;
      height: 0;
      margin-top: 10px;
      margin-left: 8px;
      border-style: solid dashed dashed;
      border-color: #fff transparent transparent;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.2s;
      border-width: 8px;
      border-top-color: #fff;
    }
    .head-tabs {
      display: none;
      position: absolute;
      right: 5px;
      top: 54px;
      z-index: 999;
      border: 1px solid #e6ebf5;
      border-radius: 2px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
      background-color: #fff;
      transform-origin: center top;
      .tab-item {
        width: 160px;
        line-height: 36px;
        padding: 0 20px;
        margin: 0;
        color: #28dbac;
      }
      .tab-item:hover{
        background: #f2f2f2;
      }
    }
  }
}
</style>