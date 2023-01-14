import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import Api from '@/AxiosConfig'


Vue.prototype.$api=Api;
Vue.prototype.$http = axios



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
