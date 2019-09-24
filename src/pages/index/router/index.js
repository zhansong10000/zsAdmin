import Vue from 'vue'
import Router from 'vue-router'

import A from '../views/PageDialog.vue';
import B from '../views/List.vue';

Vue.use(Router);
const C = {template: '<div>C</div>'};
const D = {template: '<div>D</div>'};
const E = {template: '<div>E</div>'};
const F = {template: '<div>F</div>'};
const G = {template: '<div>G</div>'};
const H = {template: '<div>H</div>'};
const I = {template: '<div>I</div>'};
const A1 = {template: '<div>A1</div>'};
export default new Router({
  mode: 'history',
  routes: [
    {path: '/a', component: A},
    {path: '/aa', component: A},
    {path: '/b', component: B},
    {path: '/c', component: C},
    {path: '/d', component: D},
    {path: '/e', component: E},
    {path: '/f', component: F},
    {path: '/g', component: G},
    {path: '/h', component: H},
    {path: '/i', component: I},
    {path: '/a1', component: A1},
  ]
})
