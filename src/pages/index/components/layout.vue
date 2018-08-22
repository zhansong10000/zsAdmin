<template>
  <div class="layui-layout layui-layout-admin">
    <zs-nav :dataList="navList"></zs-nav>
    <zs-navTab></zs-navTab>
    <div class="zs-body">
      <router-view/>
    </div>
  </div>
</template>
<script>
  // 导入样式
  import '@/assets/css/zsui.css';
  import zsNav from '@/components/zsNav';
  import zsNavTab from '@/components/zsNavTab';

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
  .zs-body {
    position: absolute;
    top: 40px;
    left: 220px;
    right:0;
    div {
      width: 100%;
      font-size: 40px;
      text-align: center;
    }
  }
</style>
