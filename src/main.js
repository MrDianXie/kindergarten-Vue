import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'default-passive-events'


import Layout from '@/components/Layout'
import VueParticles from 'vue-particles'
import './plugins/charts.js'
Vue.use(VueParticles)
Vue.use(router)
Vue.component("Layout",Layout)
store.dispatch("User/whoAmI")


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
