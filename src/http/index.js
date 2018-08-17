import http from './http';
const install = (Vue,option) => {
  if (install.installed)
    return;
  install.installed = true;
  const ajax = (option) => {
    return http(option,Vue)
  }
  Object.defineProperties(Vue.prototype, {
    // 注意哦，此处挂载在 Vue 原型的 $api 对象上
    axios: {
      get() {
        return ajax
      }
    },

    $http: {
      get() {
        return ajax
      }
    }
  })
}

export default install
