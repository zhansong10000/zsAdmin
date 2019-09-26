<template>
  <div class="main">
    <div class="main-top">
      <zs-head></zs-head>
    </div>
    <div class="main-content">
      <zs-nav :dataList="menuList" :curItem="curItem" @onItemChildClick="add"></zs-nav>
      <zs-nav-tab
        :dataList="navList"
        @clickItem="setSelect"
        @removeItem="remove"
        @removeOther="removeOther"
        @removeAll="removeAll"
      ></zs-nav-tab>
      <div class="content">
        <transition name="el-fade-in-linear" mode="out-in">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
        </transition>
        <transition name="el-fade-in-linear" mode="out-in">
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
// 导入样式
import { mapMutations, mapState } from "vuex";
import zsHead from "@/components/layout/zsHead";
import zsNav from "@/components/layout/zsNav";
import zsNavTab from "@/components/layout/zsNavTab";

export default {
  name: "zs-layout",
  components: {
    "zs-head": zsHead,
    "zs-nav": zsNav,
    "zs-nav-tab": zsNavTab
  },
  data() {
    return {
      menuList: [
        {
          name: "工具",
          href: "a"
        },
        {
          name: "开发工具",
          children: [
            {
              name: "调试预览",
              href: "b"
            }
          ]
        },
        {
          name: "布局",
          children: [
            {
              name: "栅格",
              href: "c"
            },
            {
              name: "后台布局",
              href: "d"
            }
          ]
        },
        {
          name: "基本元素",
          children: [
            {
              name: "选项卡",
              href: "e"
            },
            {
              name: "按钮",
              href: "f"
            },
            {
              name: "表单",
              href: "g"
            },
            {
              name: "进度条",
              href: "h"
            }
          ]
        },
        {
          name: "评分",
          children: [
            {
              name: "模板引擎",
              href: "i"
            }
          ]
        },
        {
          name: "组件",
          children: [
            {
              name: "组件1",
              href: "i"
            },
            {
              name: "组件2",
              href: "i"
            },
            {
              name: "组件3",
              href: "i"
            },
            {
              name: "组件4",
              href: "i"
            },
            {
              name: "组件5",
              href: "i"
            },
            {
              name: "组件6",
              href: "i"
            },
            {
              name: "组件7",
              href: "i"
            },
            {
              name: "组件8",
              href: "i"
            },
            {
              name: "组件9",
              href: "i"
            },
            {
              name: "组件10",
              href: "i"
            },
            {
              name: "组件11",
              href: "i"
            },
            {
              name: "组件12",
              href: "i"
            },
            {
              name: "组件13",
              href: "i"
            },
            {
              name: "组件14",
              href: "i"
            },
            {
              name: "组件15",
              href: "i"
            }
          ]
        }
      ]
    };
  },
  mounted() {
    this.redirectRoute();
  },
  methods: {
    redirectRoute() {
      let path = this.$route.path.replace(/\//g, "");
      let curItem = this.getNavItemByPath(path);
      if (!curItem) {
        let name = this.$route.meta.navName;
        curItem = {
          href: this.$route.fullPath,
          name: name
        };
      }
      this.add(curItem);
    },
    getNavItemByPath(path) {
      let curItem = null;
      for (let item of this.menuList) {
        if (item.href == path) {
          curItem = {
            href: item.href,
            name: item.name
          };
        } else {
          if (item.children) {
            for (let child of item.children) {
              if (child.href == path) {
                curItem = {
                  href: child.href,
                  name: child.name
                };
              }
            }
          }
        }
      }
      return curItem;
    },
    ...mapMutations({
      add: "ADD_NAV_ITEM",
      setSelect: "SET_CUR_ITEM",
      remove: "REMOVE_NAV_ITEM",
      removeOther: "REMOVE_OTHER_ITEM",
      removeAll: "REMOVE_ALL_ITEM"
    })
  },
  computed: {
    ...mapState({
      curItem: state => state.nav.curItem,
      navList: state => state.nav.navList
    })
  },
  watch: {
    curItem(newVal, oldVal) {
      this.$router.push(newVal.href);
    },
    $route(to, from) {
      let vm = this;
      let toPath = to.path.replace(/\//g, "");
      let item = vm.getNavItemByPath(toPath);
      if (!item) {
        let name = vm.curItem.navName;
        item = {
          name: name,
          href: to.fullPath
        };
      }
      vm.setSelect(item);
    }
  }
};
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
    width: calc(100% - 228px);
    margin-top: 41px;
    margin-left: 229px;
    height: calc(100% - 40px);
    border: 1px solid #d8dde3;
    border-top: none;
    background: #fff;
  }
}
</style>
