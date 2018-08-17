<template>
  <div id="app1" class="layui-layout layui-layout-admin">
    <zs-nav :navList="navList"></zs-nav>
    <router-view>

    </router-view>
  </div>
</template>

<script>
  // 导入样式
  import '@/assets/css/layui.css';
  //import '@/assets/css/global.css';
  import zsNav from '@/components/zsNav';

  export default {
    name: 'App',
    components: {
      'zs-nav': zsNav
    },
    data() {
      return {
        navList: [
          {
            name: "工具",
          }, {
            name: "开发工具",
            children: [
              {
                name: "调试预览"
              }
            ]
          }, {
            name: "布局",
            children: [
              {
                name: "栅格"
              },
              {
                name: "后台布局"
              }
            ]
          }, {
            name: "基本元素",
            children: [
              {
                name: "选项卡"
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
        ]
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
