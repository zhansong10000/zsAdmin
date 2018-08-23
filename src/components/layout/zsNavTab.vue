<template>
  <div class="zs-pagetabs">
    <div class="zs-icon zs-tabs-control zs-icon-prev" layadmin-event="leftPage" @click="tabMoveLeft"></div>
    <div class="zs-icon zs-tabs-control zs-icon-next" layadmin-event="rightPage" @click="tabMoveRight"></div>
    <div class="zs-icon zs-tabs-control zs-icon-down" @mouseleave="showClosePanl=false"
         @mouseenter="showClosePanl=true">
      <ul class="zs-nav zs-tabs-select">
        <li class="layui-nav-item">
          <dl class="zs-nav-child zs-anim-fadein zs-anim zs-anim-upbit" :class="{'zs-show':showClosePanl}">
            <dd><a href="javascript:void(0);" @click="closeCur">关闭当前标签页</a></dd>
            <dd><a href="javascript:void(0);" @click="closeOther">关闭其它标签页</a></dd>
            <dd><a href="javascript:void(0);" @click="closeAll">关闭全部标签页</a></dd>
          </dl>
        </li>
      </ul>
    </div>
    <div class="zs-tab" ref="tab">
      <ul class="zs-tab-title" ref="tabUl" :style="'left: '+offsetLeft+'px;'">
        <template v-for="(item,index) in dataList">
          <li :class="{'zs-this':item.isSelect}" @click="clickItem(item,index)">
            <span>{{item.name}}</span>
            <i class="zs-icon zs-unselect zs-tab-close" @click.stop="removeItem(item,index)">&#x1006;</i>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
<script>
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: "zs-nav-tab",
    data() {
      return {
        offsetLeft: 0,
        tabBoxWith: 0,
        len: 0,
        showClosePanl: false,
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.tabBoxWith = this.$refs.tab.clientWidth;
      });
    },
    methods: {
      removeItem(item, index) {
        this.remove({item: item, index: index});
      },
      clickItem(item, index) {
        this.setSelect({item: item, index: index});
      },
      closeCur() {
        this.showClosePanl = false;
        for (let i = 0; i < this.dataList.length; i++) {
          let item = this.dataList[i];
          if (item.isSelect) {
            this.remove({item: this.dataList[i], index: i});
          }
        }
      },
      closeOther() {
        this.showClosePanl = false;
        this.removeOther();
      },
      closeAll() {
        this.showClosePanl = false;
        this.removeAll();
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
        this.$nextTick(function () {
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
        });
      },
      tabMoveByRemoveItem() {
        this.$nextTick(function () {
          if (this.offsetLeft == 0) return;
          let $tabUL = this.$refs.tabUl;
          let $childs = $tabUL.childNodes;
          let childWidth = 0;
          let leftPreChild;
          for (let i = 0; i < $childs.length; i++) {
            let $child = $childs[i];
            if ($child.offsetLeft + this.offsetLeft >= 0) {
              childWidth += $child.offsetWidth;
            } else {
              leftPreChild = $child;
            }
          }
          if (childWidth < this.tabBoxWith) {
            if (leftPreChild) {
              this.offsetLeft = -leftPreChild.offsetLeft;
            }
          }
        });
      },
      tabMoveByCurItem() {
        this.$nextTick(function () {
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
          } else if (curChild.offsetLeft + curChild.offsetWidth + this.offsetLeft > this.tabBoxWith) {
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
      },
      ...mapMutations(
        {
          setSelect: 'SET_CUR_ITEM',
          remove: 'REMOVE_NAV_ITEM',
          removeOther: 'REMOVE_OTHER_ITEM',
          removeAll: 'REMOVE_ALL_ITEM'
        }
      )
    },
    computed: {
      ...mapState({
        dataList: state => state.nav.navList,
      }),
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
  }
</script>
<style lang="scss" scoped>
  .zs-pagetabs {
    height: 40px;
    line-height: 40px;
    padding: 0 80px 0 40px;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
    transition: all .3s;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 999;
    left: 220px;
    .zs-icon-prev {
      left: 0;
      border-left: none;
      border-right: 1px solid #f6f6f6;
      &:before {
        content: "\e65a";
      }
    }
    .zs-icon-next {
      right: 40px;
      &:before {
        content: "\e65b";
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
          box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
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
              transition: all .3s;
              -webkit-transition: all .3s;
              &:hover {
                background-color: #f2f2f2;
                color: #000;
              }
            }
          }
        }
      }
      &:before {
        content: "\e61a";
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
      transition: all .3s;
      -webkit-transition: all .3s;
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
          background-color: #292B34;
        }
        &:hover {
          background-color: #f6f6f6;
          &:after {
            width: 100%;
          }
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
        border-right: 1px solid #f6f6f6;
        vertical-align: top;
        .zs-tab-close {
          position: absolute;
          right: 8px;
          top: 50%;
          margin: -7px 0 0;
          width: 16px;
          height: 16px;
          line-height: 16px;
          border-radius: 50%;
          font-size: 12px;
          &:hover {
            background-color: #FF5722;
            color: #fff;
          }
        }
        &:hover {
          background-color: #f6f6f6;
          &:after {
            width: 100%;
          }
        }
        &:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 2px;
          border-radius: 0;
          background-color: #292B34;
          transition: all .3s;
          -webkit-transition: all .3s;
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
    transition: all .2s;
    -webkit-transition: all .2s;
    li {
      display: inline-block;
      vertical-align: middle;
      font-size: 14px;
      transition: all .2s;
      -webkit-transition: all .2s;
      position: relative;
      line-height: 40px;
      min-width: 65px;
      padding: 0 15px;
      text-align: center;
      cursor: pointer;
    }
  }

</style>
