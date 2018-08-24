// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from '@/store'
import router from './router'
import http from '@/http'
//import  {zsDialog}  from  '@/components/zsui/src';
import zsui  from  '@/components/zsui/src';

//开启debug模式
Vue.config.productionTip = false
Vue.use(http);
Vue.use(zsui);
//Vue.component(zsDialog.name,zsDialog);
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
