<template>
  <div class="main">
    <div class="main-top"></div>
    <div class="main-content">
      <zs-nav :dataList="navList"></zs-nav>
      <zs-navTab></zs-navTab>
      <div class="content">
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
  // 导入样式
  import '@/assets/css/zsui.css';
  import zsNav from '@/components/layout/zsNav';
  import zsNavTab from '@/components/layout/zsNavTab';

  export default {
    name: 'App',
    components: {
      'zs-nav': zsNav,
      'zs-navTab': zsNavTab
    },
    data() {
      return {
        navList: [
          {
            name: "工具",
            href: 'a'
          }, {
            name: "开发工具",
            children: [
              {
                name: "调试预览",
                href: 'b'
              }
            ]
          }, {
            name: "布局",
            children: [
              {
                name: "栅格",
                href: 'c'
              },
              {
                name: "后台布局",
                href: 'd'
              }
            ]
          }, {
            name: "基本元素",
            children: [
              {
                name: "选项卡",
                href: 'e'
              },
              {
                name: "按钮",
                href: 'f'
              },
              {
                name: "表单",
                href: 'g'
              },
              {
                name: "进度条",
                href: 'h'
              }
            ]
          }, {
            name: "评分",
            children: [
              {
                name: "模板引擎",
                href: 'i'
              }
            ]
          }, {
            name: "组件",
            children: [
              {
                name: "组件1",
                href: 'i'
              },
              {
                name: "组件2",
                href: 'i'
              },
              {
                name: "组件3",
                href: 'i'
              },
              {
                name: "组件4",
                href: 'i'
              },
              {
                name: "组件5",
                href: 'i'
              },
              {
                name: "组件6",
                href: 'i'
              },
              {
                name: "组件7",
                href: 'i'
              },
              {
                name: "组件8",
                href: 'i'
              },
              {
                name: "组件9",
                href: 'i'
              },
              {
                name: "组件10",
                href: 'i'
              },
              {
                name: "组件11",
                href: 'i'
              },
              {
                name: "组件12",
                href: 'i'
              },
              {
                name: "组件13",
                href: 'i'
              },
              {
                name: "组件14",
                href: 'i'
              },
              {
                name: "组件15",
                href: 'i'
              }
            ]
          }
        ]
      }
    },
    methods: {}
  }
</script>
<style lang="scss" scoped>
  .main {
    width: 100%;
    position: relative;
    background: #f4f4f4;

    .main-top {
      width: 100%;
      height: 66px;
      background: #00ceab;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-pack: justify;
      justify-content: space-between;
    }

    .main-content {
      width: 100%;
      padding: 0 10px;
      position: fixed;
      top: 76px;
      left: 0;
      bottom: 10px;
    }

    .content {
      position: relative;
      width: calc(100% - 250px);
      margin-top: 41px;
      margin-left :229px;
      height: calc(100% - 40px);
      border: 1px solid #d8dde3;
      border-top:none;
      background: #fff;
    }
  }
</style>
