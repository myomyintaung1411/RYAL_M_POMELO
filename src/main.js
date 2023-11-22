import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import './assets/style.css';
import 'babel-polyfill'; //for ie support
import 'es6-promise/auto';//for ie support
import 'es6-object-assign/auto';//for ie support
import Vant from 'vant';
import 'vant/lib/index.css';
import './index.css';

import './permission' // permission control
import './utils/error-log' // error log

import md5 from 'js-md5'
import ws from './api/ws2'
import leaf from './api/leaf.js'
import global_ from './api/global'
import moment from 'moment'
import * as filters from './filters' // global filters

Vue.prototype.$md5 = md5
Vue.prototype.$Global = global_
Vue.prototype.$ws = ws
Vue.prototype.$pomelo = leaf
Vue.prototype.$moment = moment

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false;
Vue.use(Vant);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
