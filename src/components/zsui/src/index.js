import zsDialog from "../packages/zsDialog";
import zsMessage from "../packages/zsMessage";
import zsTable from "../packages/zsTable";
import zsPagination from "../packages/zsPagination";

const components = [zsDialog, zsTable, zsPagination];

const install = function(Vue, opts = {}) {
  if (install.installed) return;
  components.forEach(component => {
    Vue.component(component.name, component);
    Vue.prototype.$alert = zsMessage.alert;
    Vue.prototype.$confirm = zsMessage.confirm;
  });

  // Vue.prototype.$loading = Loading.service;
};

/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
export default install;
export { zsDialog, zsMessage, zsTable };
