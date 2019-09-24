<template>
  <div class="zs-side">
    <div @mouseleave="onMouseLeave($event)" class="zs-side-scroll">
      <ul class="zs-nav">
        <template v-for="(item,index) in dataList">
          <li
            :class="{'zs-nav-itemed':item.isCur == true}"
            @mouseenter="onMouseEnter('1',$event)"
            class="zs-nav-item"
            v-if="item.children&&item.children.length>0"
          >
            <a @click="onItemClick(item,index)" href="javascript:void(0);">
              {{item.name}}
              <span class="zs-nav-more"></span>
            </a>
            <dl class="zs-nav-child">
              <dd
                :class="{'zs-this':activeIndex== index+'-'+childIndex}"
                v-for="(child,childIndex) in item.children"
              >
                <a @click="onItemChildClick(child)" href="javascript:void(0);">{{child.name}}</a>
              </dd>
            </dl>
          </li>
          <li
            :class="{'zs-this':activeIndex== index+'-0'}"
            @mouseenter="onMouseEnter('1',$event)"
            class="zs-nav-item"
            v-else
          >
            <a @click="onItemChildClick(item)" href="javascript:void(0);">{{item.name}}</a>
          </li>
        </template>
        <li
          @mouseenter="onMouseEnter('2',$event)"
          class="zs-nav-item"
          style="height: 30px; text-align: center;color:#fff;background:#fff;"
        ></li>
        <span :style="navBarStyle" class="zs-nav-bar"></span>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "zs-nav",
  props: {
    dataList: {
      type: Array,
      default: () => {
        [];
      }
    },
    curItem: {
      type: Object
    }
  },
  data() {
    return {
      activeIndex: -1,
      offsetTop: "",
      mouseType: "1",
      navBarStyle: ""
    };
  },
  mounted() {},
  methods: {
    onItemClick(item, index) {
      let vm = this;
      if (!item.isCur) {
        item.isCur = true;
      } else {
        item.isCur = false;
      }
      vm.$set(vm.dataList, index, item);
    },
    onItemChildClick(item) {
      this.$emit("onItemChildClick", item);
    },
    onMouseEnter(mouseType, event) {
      this.mouseType = mouseType;
      this.offsetTop = event.currentTarget.offsetTop + "px";
    },
    onMouseLeave(event) {
      this.navBarStyle =
        "top: " +
        this.offsetTop +
        ";height:0px; opacity: 0;transition:all 0.5s";
      this.offsetTop = -1;
    },
    setActiveItem(item) {
      let vm = this;
      if (item) {
        vm.$router.push(item.href);
      } else {
        vm.activeIndex = "";
        vm.$router.push("/");
        return;
      }
      for (let i = 0; i < vm.dataList.length; i++) {
        let temp = vm.dataList[i];
        if (temp.children && temp.children.length > 0) {
          for (let j = 0; j < temp.children.length; j++) {
            let childTemp = temp.children[j];
            if (childTemp.href == item.href) {
              temp.isCur = true;
              vm.activeIndex = i + "-" + j;
              break;
            }
          }
        } else {
          if (temp.href == item.href) {
            vm.activeIndex = i + "-0";
            break;
          }
        }
      }
    }
  },
  watch: {
    curItem(newVal, oldVal) {
      this.setActiveItem(newVal);
    },
    offsetTop(newVal, oldVal) {
      if (newVal == -1) {
        return;
      }
      if (this.mouseType == "1") {
        this.navBarStyle = "top: " + newVal + "; height: 45px; opacity: 1;";
      } else {
        this.navBarStyle =
          "top: " + newVal + ";height:0px; opacity: 0;transition:all 0.5s";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.zs-side {
  position: relative;
  float: left;
  z-index: 999;
  width: 220px;
  height: 100%;
  overflow-x: hidden;
  border: 1px solid #d8dde3;
  background: #fff;
  .zs-side-scroll {
    position: relative;
    width: 240px;
    height: 100%;
    overflow-x: hidden;
  }
}

.zs-nav * {
  font-size: 14px;
}

.zs-nav {
  position: relative;
  background-color: #fff;
  font-size: 0;
  width: 220px;

  .zs-nav-item {
    position: relative;
    background: #e0f9f2;
    margin-bottom: 1px;
    vertical-align: middle;
    line-height: 45px;
    width: 100%;

    .zs-nav-img {
      width: 30px;
      height: 30px;
      margin-right: 10px;
      border-radius: 50%;
    }

    a {
      position: relative;
      height: 45px;
      line-height: 45px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      display: block;
      padding: 0 20px;
      color: #1bd0a1;
      transition: all 0.3s;
      -webkit-transition: all 0.3s;

      .zs-nav-more {
        content: "";
        width: 0;
        height: 0;
        border-style: solid dashed dashed;
        border-color: #1bd0a1 transparent transparent;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.2s;
        -webkit-transition: all 0.2s;
        position: absolute;
        top: 50%;
        right: 10px;
        margin-top: 0;
        border-width: 5px;
        border-top-color: #1bd0a1;
      }
    }

    .zs-nav-child {
      display: none;
      left: 0;
      top: 65px;
      min-width: 100%;
      line-height: 45px;
      background-color: #fff;
      z-index: 100;
      white-space: nowrap;
      dd {
        a {
          color: #939393;
          padding-left: 40px;
        }
        &:hover {
          background: #eee;
        }
      }
      .zs-this {
        &:hover {
          background: #1bd0a1;
          a {
            color: #fff;
          }
        }
      }
    }
  }

  .zs-nav-itemed {
    a {
      .zs-nav-more {
        margin-top: -9px;
        border-style: dashed dashed solid;
        border-color: transparent transparent #1bd0a1;
      }
    }
    .zs-nav-child {
      display: block;
      padding: 0;
      background: #fff;
      .zs-this {
        background: #1bd0a1;
        a {
          color: #fff;
        }
      }
    }
  }
  .zs-this {
    background: #1bd0a1;
    a {
      color: #fff;
    }
  }

  .zs-nav-bar {
    position: absolute;
    z-index: 1000;
    width: 5px;
    height: 0;
    background-color: #1bd0a1;
  }
}
</style>
