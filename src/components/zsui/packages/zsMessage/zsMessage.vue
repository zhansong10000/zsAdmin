<template>
  <div>
    <div v-if="showDialog" class="zs-layer-shade" :style="shadeStyle"></div>
    <transition
      enter-to-class="show-layer-fadeIn"
      leave-to-class="hide-layer-fadeIn">
      <div v-if="showDialog" class="zs-layer zs-layer-dialog show-layer-fadeIn"
           :class="{'hide-layer-fadeIn':showHideClass}" :style="dialogStyle">
        <div class="zs-layer-title" :class="{'cursorMove':moveDialog}" v-move="moveDialog">{{title}}</div>
        <div class="zs-layer-content">
          {{message}}
        </div>
        <span class="zs-layer-setwin">
        <a class="zs-icon zs-icon-close" href="javascript:void(0);" @click.stop="close"></a>
      </span>
        <div class="zs-layer-btn">
          <a class="zs-btn  zs-btn-normal zs-btn-sm" @click="handleAction('confirm')">{{confirmButtonText}}</a>
          <a class="zs-btn  zs-btn-primary zs-btn-sm" v-if="showCancelButton" @click="handleAction('cancel')">{{cancelButtonText}}</a>
        </div>
        <span class="zs-layer-resize"></span>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    name: "zs-Message",
    mounted() {
      var that = this;
      this.$nextTick(() => {
        that.setStyle();
      })
    },
    data() {
      return {
        showDialog: false,
        moveDialog: true,
        showHideClass: false,
        shadeStyle: "",
        dialogStyle: "",
        height: 154,
        width: 260,
        title: '',
        message: '',
        confirmButtonText: '',
        cancelButtonText: '',
        showCancelButton: false,
        callback: null
      }
    },
    props: {},
    directives: {
      move: {
        // 指令的定义
        inserted: function (el, binding) {
          if (!binding.value) return;
          let oDiv = el.parentNode;   //当前元素
          let self = this;  //上下文
          el.onmousedown = function (e) {
            let disX = e.clientX - oDiv.offsetLeft;
            let disY = e.clientY - oDiv.offsetTop;
            document.onmousemove = function (e) {
              let l = e.clientX - disX;
              let t = e.clientY - disY;
              oDiv.style.left = l + 'px';
              oDiv.style.top = t + 'px';
            };
            document.onmouseup = function (e) {
              document.onmousemove = null;
              document.onmouseup = null;
            };
          };
        }
      }
    },
    methods: {
      setStyle() {
        let maxZIndex = [...document.all].reduce((r, e) => Math.max(r, +window.getComputedStyle(e).zIndex || 0), 0);
        this.shadeStyle = "z-index: " + maxZIndex + "; opacity: 0.3;";
        let clientHeight = document.documentElement.clientHeight;
        let clientWidth = document.documentElement.clientWidth;
        let left = Math.round((clientWidth - this.width) / 2);
        let top = Math.round((clientHeight - this.height) / 2);
        let dialogStyleArray = new Array();
        dialogStyleArray.push("z-index:", (maxZIndex + 1), ";");
        dialogStyleArray.push("width:", this.width, "px;");
        dialogStyleArray.push("height:", this.height, "px;");
        dialogStyleArray.push("top:", top, "px;");
        dialogStyleArray.push("left:", left, "px;");
        this.dialogStyle = dialogStyleArray.join('');
      },
      close() {
        this.showDialog = false
      },
      handleAction(action) {
        var callback = this.callback;
        this.showDialog = false
        callback(action);
      }
    },
    watch: {
      showDialog(val) {
        this.showHideClass = !val;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .zs-layer-shade {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0);
  }

  .zs-layer-dialog {
    min-width: 260px;
  }

  .zs-layer {
    position: fixed;
    -webkit-overflow-scrolling: touch;
    top: 150px;
    left: 0;
    margin: 0;
    padding: 0;
    background-color: #fff;
    -webkit-background-clip: content;
    border-radius: 2px;
    box-shadow: 1px 1px 50px rgba(0, 0, 0, .3);
    pointer-events: auto;
    .zs-layer-title {
      padding: 0 80px 0 20px;
      height: 42px;
      line-height: 42px;
      border-bottom: 1px solid #eee;
      font-size: 14px;
      color: #333;
      overflow: hidden;
      background-color: #F8F8F8;
      border-radius: 2px 2px 0 0;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: default;
    }
    .cursorMove {
      cursor: move;
    }
    .zs-layer-content {
      position: relative;
      padding: 20px;
      line-height: 24px;
      word-break: break-all;
      overflow: hidden;
      font-size: 14px;
      color: #666;
      overflow-x: hidden;
      overflow-y: auto;
    }
    .zs-layer-setwin {
      position: absolute;
      right: 15px;
      top: 15px;
      line-height: initial;
      a {
        position: relative;
        width: 16px;
        height: 16px;
        margin-left: 10px;
        font-size: 16px;
        display: inline-block;
        vertical-align: top;
      }
      .zs-icon-close {
        &:before {
         content: "\e723";
        }
      }
    }
    .zs-layer-btn {
      text-align: right;
      height: 45px;
      line-height: 45px;
      vertical-align: middle;
      padding: 0 20px 20px;
      pointer-events: auto;
      user-select: none;
      -webkit-user-select: none;
    }
    .zs-layer-resize {
      position: absolute;
      width: 15px;
      height: 15px;
      right: 0;
      bottom: 0;
      cursor: se-resize;
    }
  }

</style>
