import filters from "./filter";
let plugin = {};

plugin.install = function(Vue, options) {
  if (plugin.installed) return;
  plugin.installed = true;

  Object.keys(filters).forEach(i => Vue.filter(i, filters[i]));
  // 1. 添加全局方法或属性
  /*   Vue.myGlobalMethod = function() {
    // 逻辑...
    console.log("myGlobalMethod");
  }; */

  // 2. 添加全局资源
  /*   Vue.directive("my-directive", {
    bind(el, binding, vnode, oldVnode) {
      // 逻辑...
    }
  }); */

  // 3. 注入组件
  /*   Vue.mixin({
    created: function() {
      // 逻辑...
    }
  }); */

  // 4. 添加实例方法
  /* Vue.prototype.$myMethod = function(methodOptions) {
    console.log("myMethod");
  }; */
  Vue.prototype.$success = function(message) {
    this.$message({
      message: message,
      type: "success"
    });
  };
  Vue.prototype.$info = function(message) {
    this.$message(message);
  };
  Vue.prototype.$error = function(message) {
    this.$message.error(message);
  };
};
export default plugin;
