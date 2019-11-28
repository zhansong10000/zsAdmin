<template>
  <div class="zs-pagetabs" :style="pagetabsStyle">
    <div @click="tabMoveLeft" v-if="showMoveBtn" class="zs-icon zs-tabs-control zs-icon-prev"></div>
    <div @click="tabMoveRight" v-if="showMoveBtn" class="zs-icon zs-tabs-control zs-icon-next"></div>
    <div
      @mouseenter="showClosePanl=true"
      @mouseleave="showClosePanl=false"
      class="zs-icon zs-tabs-control zs-icon-down"
    >
      <ul class="zs-nav zs-tabs-select">
        <li class="layui-nav-item">
          <dl :class="{'zs-show':showClosePanl}" class="zs-nav-child show-layer-fadeIn">
            <dd>
              <a @click="closeCur" href="javascript:void(0);">关闭当前标签页</a>
            </dd>
            <dd>
              <a @click="closeOther" href="javascript:void(0);">关闭其它标签页</a>
            </dd>
            <dd>
              <a @click="closeAll" href="javascript:void(0);">关闭全部标签页</a>
            </dd>
          </dl>
        </li>
      </ul>
    </div>
    <div class="zs-tab" ref="tab">
      <ul :style="'left: '+offsetLeft+'px;'" class="zs-tab-title" ref="tabUl">
        <template v-for="(item,index) in dataList">
          <li :class="{'zs-this':item.isSelect}" @click="clickItem(item)">
            <span>{{item.name}}</span>
            <i @click.stop="removeItem(item,index)" class="zs-icon zs-tab-close"></i>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "zs-nav-tab",
  props: {
    dataList: {
      type: Array,
      default: () => {
        [];
      }
    }
  },
  data() {
    return {
      offsetLeft: 0,
      tabBoxWith: 0,
      totalChildWidth: 0,
      len: 0,
      pagetabsStyle: {
        padding: "0 40px 0 0"
      },
      showClosePanl: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.tabBoxWith = this.$refs.tab.clientWidth;
    });
  },
  methods: {
    removeItem(item, index) {
      this.$emit("removeItem", { item: item, index: index });
    },
    clickItem(item) {
      this.$emit("clickItem", item);
    },
    closeCur() {
      this.showClosePanl = false;
      for (let i = 0; i < this.dataList.length; i++) {
        let item = this.dataList[i];
        if (item.isSelect) {
          this.$emit("removeItem", { item: this.dataList[i], index: i });
        }
      }
    },
    closeOther() {
      this.showClosePanl = false;
      this.$emit("removeOther");
    },
    closeAll() {
      this.showClosePanl = false;
      this.$emit("removeAll");
    },
    tabMoveLeft() {
      if (this.offsetLeft == 0) return;
      let $tabUL = this.$refs.tabUl;
      let $childs = $tabUL.childNodes;
      let childWidth = 0;
      for (let i = $childs.length - 1; i >= 0; i--) {
        let $child = $childs[i];
        if ($child.offsetLeft + this.offsetLeft < 0) {
          childWidth += $child.offsetWidth;
          if (childWidth > this.tabBoxWith) {
            this.offsetLeft = -$child.offsetLeft - $child.offsetWidth;
            break;
          }
        }
      }
      if (childWidth <= this.tabBoxWith) {
        this.offsetLeft = 0;
      }
    },
    tabMoveRight() {
      let $tabUL = this.$refs.tabUl;
      let $childs = $tabUL.childNodes;
      let childWidth = 0;
      let leftPreChild;
      for (let i = 0; i < $childs.length; i++) {
        let $child = $childs[i];
        if ($child.offsetLeft + this.offsetLeft >= 0) {
          childWidth += $child.offsetWidth;
          if (childWidth > this.tabBoxWith) {
            this.offsetLeft = -$child.offsetLeft;
            break;
          }
        }
      }
    },
    tabMoveByAddItem() {
      this.$nextTick(() => {
        let $tabUL = this.$refs.tabUl;
        let $childs = $tabUL.childNodes;
        let childWidth = 0;
        for (let i = $childs.length - 1; i >= 0; i--) {
          let $child = $childs[i];
          childWidth += $child.offsetWidth;
          if (childWidth > this.tabBoxWith) {
            this.offsetLeft = -$child.offsetLeft - $child.offsetWidth;
            break;
          }
        }
        if (childWidth <= this.tabBoxWith) {
          this.offsetLeft = 0;
        }
        this.totalChildWidth = childWidth;
      });
    },
    tabMoveByRemoveItem() {
      this.$nextTick(() => {
        let $tabUL = this.$refs.tabUl;
        let $childs = $tabUL.childNodes;
        let totalChildWidth = 0;
        let childWidth = 0;
        let leftPreChild;
        for (let i = 0; i < $childs.length; i++) {
          let $child = $childs[i];
          totalChildWidth += $child.offsetWidth;
          if ($child.offsetLeft + this.offsetLeft >= 0) {
            childWidth += $child.offsetWidth;
          } else {
            leftPreChild = $child;
          }
        }
        this.totalChildWidth = totalChildWidth;
        if (this.offsetLeft == 0) return;
        if (childWidth < this.tabBoxWith) {
          if (leftPreChild) {
            this.offsetLeft = -leftPreChild.offsetLeft;
          }
        }
      });
    },
    tabMoveByCurItem() {
      this.$nextTick(() => {
        let $tabUL = this.$refs.tabUl;
        let $childs = $tabUL.childNodes;
        let curChild;
        let curIndex = 0;
        for (let i = 0; i < $childs.length; i++) {
          let $child = $childs[i];
          if ($child.className == "zs-this") {
            curIndex = i;
            curChild = $child;
            break;
          }
        }
        if (curChild.offsetLeft + this.offsetLeft < 0) {
          this.offsetLeft = -curChild.offsetLeft;
        } else if (
          curChild.offsetLeft + curChild.offsetWidth + this.offsetLeft >
          this.tabBoxWith
        ) {
          let childWidth = 0;
          for (let i = curIndex; i >= 0; i--) {
            let $child = $childs[i];
            childWidth += $child.offsetWidth;
            if (childWidth > this.tabBoxWith) {
              this.offsetLeft = -$child.offsetLeft - $child.offsetWidth;
              break;
            }
          }
        }
      });
    }
  },
  computed: {
    showMoveBtn() {
      let totalChildWidth = this.totalChildWidth - this.offsetLeft;
      if (this.tabBoxWith > totalChildWidth) {
        this.offsetLeft = 0;
        this.pagetabsStyle = {
          padding: "0 40px 0 0"
        };
        return false;
      } else {
        this.pagetabsStyle = {
          padding: "0 80px 0 40px"
        };
        return true;
      }
    }
  },
  watch: {
    dataList(newVal, oldVal) {
      var length = newVal.length;
      if (length > this.len) {
        this.tabMoveByAddItem();
      } else if (length == this.len) {
        this.tabMoveByCurItem();
      } else {
        this.tabMoveByRemoveItem();
      }
      this.len = length;
    }
  }
};
</script>
<style lang="scss" scoped>
.zs-pagetabs {
  height: 40px;
  line-height: 40px;
  padding: 0 80px 0 40px;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  position: fixed;
  top: 76px;
  right: 10px;
  z-index: 999;
  left: 240px;

  .zs-icon-prev {
    left: 0;
    border-left: none;
    border-right: 1px solid #f6f6f6;

    &:before {
      content: "\e779";
      color: #e52d11;
    }
  }

  .zs-icon-next {
    right: 40px;

    &:before {
      content: "\e775";
      color: #e52d11;
    }
  }

  .zs-icon-down {
    right: 0;

    .zs-tabs-select.zs-nav {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      padding: 0;
      background: 0 0;

      .zs-nav-child {
        display: none;
        position: absolute;
        top: 40px;
        left: auto;
        right: 0;
        font-size: 14px;
        min-width: 100%;
        line-height: 36px;
        padding: 5px 0;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
        border: 1px solid #d2d2d2;
        background-color: #fff;
        z-index: 100;
        border-radius: 2px;
        white-space: nowrap;

        dd {
          position: relative;

          a {
            color: #666;
            display: block;
            padding: 0 20px;
            transition: all 0.3s;
            -webkit-transition: all 0.3s;

            &:hover {
              background-color: #f2f2f2;
              color: #000;
            }
          }
        }
      }
    }

    &:before {
      content: "\e772";
      color: #e52d11;
    }

    &:hover {
      background-color: #f6f6f6;
    }
  }

  .zs-tabs-control {
    position: absolute;
    top: 0;
    width: 40px;
    height: 100%;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    -webkit-transition: all 0.3s;
    box-sizing: border-box;
    border-left: 1px solid #f6f6f6;
  }

  .zs-tab {
    margin: 0;
    overflow: hidden;
    text-align: left !important;
  }

  .zs-tab-title {
    height: 40px;
    border: none;

    .zs-this {
      color: #000;
      background-color: #f6f6f6;

      &:after {
        width: 100%;
        border: none;
        height: 2px;
        background-color: #e52d11;
      }

      &:hover {
        background-color: #f6f6f6;
        &:after {
          width: 100%;
        }
      }
      .zs-tab-close {
        display: inline;
      }
    }

    li {
      min-width: 0;
      line-height: 40px;
      max-width: 160px;
      text-overflow: ellipsis;
      padding-right: 40px;
      overflow: hidden;
      color: #666;
      border-right: 1px solid #f7f0f0;
      vertical-align: top;

      .zs-tab-close {
        display: none;
        position: absolute;
        right: 8px;
        top: 50%;
        margin: -7px 0 0;
        width: 16px;
        height: 16px;
        line-height: 16px;
        border-radius: 50%;
        font-size: 12px;
        &:before {
          content: "\e723";
        }
        &:hover {
          background-color: #ff5722;
          color: #fff;
        }
      }

      &:hover {
        background-color: #f6f6f6;
        .zs-tab-close {
          display: inline;
        }
        &:after {
          width: 100%;
        }
      }

      &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 2px;
        border-radius: 0;
        background-color: #e52d11;
        transition: all 0.3s;
        -webkit-transition: all 0.3s;
      }
    }
  }
}

.zs-tab {
  text-align: left !important;
}

.zs-tab-title {
  position: relative;
  left: 0;
  height: 40px;
  white-space: nowrap;
  font-size: 0;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  transition: all 0.2s;
  -webkit-transition: all 0.2s;

  li {
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    transition: all 0.2s;
    -webkit-transition: all 0.2s;
    position: relative;
    line-height: 40px;
    min-width: 65px;
    padding: 0 15px;
    text-align: center;
    cursor: pointer;
  }
}
</style>
