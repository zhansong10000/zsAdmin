import zsDialog from '../packages/zsDialog';
import zsTable from '../packages/zsTable';

const components = [
  zsDialog,
  zsTable
]

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });

 // Vue.prototype.$loading = Loading.service;
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export default install
