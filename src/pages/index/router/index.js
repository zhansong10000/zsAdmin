import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
const A = { template: '<div>A</div>' };
const B = { template: '<div>B</div>' };
const C = { template: '<div>C</div>' };
const D = { template: '<div>D</div>' };
const E = { template: '<div>E</div>' };
export default new Router({
  mode: 'history',
  routes: [
    { path: '/a', component: A },
    { path: '/b', component: B },
    { path: '/c', component: C },
    { path: '/d', component: D },
    { path: '/e', component: E },
  ]
})
