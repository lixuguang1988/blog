// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './vuex'
import * as filters from './utils/filters'
import directives from './utils/directives'

Vue.config.productionTip = false


Object.keys(filters).forEach(key=>{
  Vue.filter(key, filters[key]);
});

Object.keys(directives).forEach(key=>{
  Vue.directive(key, directives[key]);
});

require('./assets/app.css');





/* eslint-disable no-new */
window.app = new Vue({
  el: '#app',
  router,
  store,
});
