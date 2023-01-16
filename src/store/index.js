
import Vue from 'vue'
import Vuex from 'vuex'
import loginUser from './model/LoginUser'

Vue.use(Vuex);
// 用Vuex.Store对象用来记录token
const store = new Vuex.Store({

  //将各模块引入
  modules:{
    loginUser,
  },
});

window.store = store;

export default store;

