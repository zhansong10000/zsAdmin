<template>
  <div>
    <div v-if="showDialog" class="zs-layer-shade" :style="shadeStyle"></div>
    <transition enter-to-class="show-layer-fadeIn" leave-to-class="hide-layer-fadeIn">
      <div
        v-if="showDialog"
        class="zs-layer zs-layer-dialog show-layer-fadeIn"
        :style="dialogStyle"
      >
        <div class="zs-layer-title" :class="{'cursorMove':moveDialog}" v-move="moveDialog">{{title}}</div>
        <div class="zs-layer-content" :style="'height:'+contentHeight+'px;padding: 10px;'">
          <slot name="content"></slot>
        </div>
        <span class="zs-layer-setwin">
          <a class="zs-icon zs-icon-close" href="javascript:void(0);" @click.stop="close"></a>
        </span>
        <div class="zs-layer-btn" v-if="showBtn">
          <slot name="button"></slot>
        </div>
        <span class="zs-layer-resize"></span>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "zs-dialog",

  mounted() {
    var that = this;
    this.$nextTick(() => {
      that.setStyle();
    });
  },
  data() {
    return {
      shadeStyle: "",
      dialogStyle: "",
      contentHeight: 0,
      showBtn: true
    };
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: function() {
        return "";
      }
    },
    //宽
    width: {
      type: String,
      default: "700"
    },
    //高
    height: {
      type: String,
      default: "500"
    },
    moveDialog: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: false
    }
  },
  directives: {
    move: {
      // 指令的定义
      inserted: function(el, binding) {
        if (!binding.value) return;
        let oDiv = el.parentNode; //当前元素
        let self = this; //上下文
        el.onmousedown = function(e) {
          //鼠标按下，计算当前元素距离可视区的距离
          let disX = e.clientX - oDiv.offsetLeft;
          let disY = e.clientY - oDiv.offsetTop;
          document.onmousemove = function(e) {
            //通过事件委托，计算移动的距离
            let l = e.clientX - disX;
            let t = e.clientY - disY;
            //移动当前元素
            oDiv.style.left = l + "px";
            oDiv.style.top = t + "px";
            //将此时的位置传出去
            // binding.value({x:e.pageX,y:e.pageY})
          };
          document.onmouseup = function(e) {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      }
    }
  },
  methods: {
    setStyle() {
      let maxZIndex = [...document.all].reduce(
        (r, e) => Math.max(r, +window.getComputedStyle(e).zIndex || 0),
        0
      );
      this.shadeStyle = "z-index: " + maxZIndex + "; opacity: 0.3;";
      let clientHeight = document.documentElement.clientHeight;
      let clientWidth = document.documentElement.clientWidth;
      let left = Math.round((clientWidth - this.width) / 2);
      let top = Math.round((clientHeight - this.height) / 2);
      let dialogStyleArray = new Array();
      dialogStyleArray.push("z-index:", maxZIndex + 1, ";");
      dialogStyleArray.push("width:", this.width, "px;");
      dialogStyleArray.push("height:", this.height, "px;");
      dialogStyleArray.push("top:", top, "px;");
      dialogStyleArray.push("left:", left, "px;");
      this.dialogStyle = dialogStyleArray.join("");
      if (this.$slots && this.$slots.button) {
        this.showBtn = true;
        this.contentHeight = this.height - 115;
      } else {
        this.showBtn = false;
        this.contentHeight = this.height - 65;
      }
    },
    close() {
      this.$emit("close", false);
    }
  },
  watch: {
    showDialog(val) {
      if (val) {
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
      }
    }
  },
  destroyed() {
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};
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
  box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
  pointer-events: auto;
  .zs-layer-title {
    padding: 0 80px 0 20px;
    height: 42px;
    line-height: 42px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    color: #333;
    overflow: hidden;
    background-color: #f8f8f8;
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
    overflow: auto;
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
        content: "\1006";
      }
    }
  }
  .zs-layer-btn {
    text-align: right;
    height: 45px;
    line-height: 45px;
    vertical-align: middle;
    padding: 5px 15px 5px;
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
