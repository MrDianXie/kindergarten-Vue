
import Vue from 'vue'
import Vuex from 'vuex'
import User from './model/User'
import teacher from "@/store/model/Teacher";
import student from '@/store/model/Student'
import classAndGrade from '@/store/model/Classandgrade'
import set from 'vuex-persistedstate'

Vue.use(Vuex);
// 用Vuex.Store对象用来记录token
const store = new Vuex.Store({

  //将各模块引入
  modules:{
    User,
    teacher,
    student,
    classAndGrade,
  },

  plugins:[
      set({
        key: 'pc-store',
        paths: ['User.user','teacher','student','classAndGrade']
      })
  ]

});

window.store = store;

export default store;

