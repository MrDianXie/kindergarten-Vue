import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'


import Layout from '@/components/Layout'
import VueParticles from 'vue-particles'
import './plugins/charts.js'
Vue.use(VueParticles)


Vue.component("Layout",Layout)
Vue.use(router)

store.dispatch("loginUser/whoAmI")
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
