<template>
  <div id="app1" class="layui-layout layui-layout-admin">
    <zs-nav :dataList="navList" :curItem="curNavItem" @onItemClick="onNavItemClick"></zs-nav>
    <zs-navTab :dataList="navTabList" :newItem="newNavTabItem" @onItemSelect="onNavTabItemSelect"></zs-navTab>
    <div class="zs-body">
      <router-view>

      </router-view>
    </div>

  </div>
</template>

<script>
  // 导入样式
  import '@/assets/css/zsui.css';
 //import '@/assets/css/layui.css';
  //import '@/assets/css/global.css';
  import zsNav from '@/components/zsNav';
  import zsNavTab from '@/components/zsNavTab';

  export default {
    name: 'App',
    components: {
      'zs-nav': zsNav,
      'zs-navTab':zsNavTab
    },
    data() {
      return {
        navList: [
          {
            name: "工具",
            href:'a'
          }, {
            name: "开发工具",
            children: [
              {
                name: "调试预览",
                href:'b'
              }
            ]
          }, {
            name: "布局",
            children: [
              {
                name: "栅格",
                href:'c'
              },
              {
                name: "后台布局",
                href:'d'
              }
            ]
          }, {
            name: "基本元素",
            children: [
              {
                name: "选项卡",
                href:'e'
              },
              {
                name: "按钮"
              },
              {
                name: "表单"
              },
              {
                name: "进度条"
              }
            ]
          }, {
            name: "评分",
            children: [
              {
                name: "模板引擎"
              }
            ]
          }
        ],
        curNavItem:null,

        navTabList:[],
        newNavTabItem:null
      }
    },
    methods:{
      //左侧导航栏
      onNavItemClick(item){
          this.newNavTabItem = item;
      },
      //头部导航栏
      onNavTabItemSelect(item){
        this.curNavItem = item;
      }
    }
  }
</script>

<style lang="scss" scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  .zs-body{
    position:absolute;
    top:40px;
    left:220px;
  }
</style>
