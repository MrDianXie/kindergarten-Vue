import * as api from '@/api/Student'
import App from "@/App";
import storage from "@/utils/storage";

export default {
    namespaced : true,

    state: {
        list:[],//学生列表
        result: false, //返回结果
        pageTotal: null,//总页数

    },

    mutations: {
        setList(state,list){
            state.list = list
        },

        setResult(state, payload) {
            state.result = payload
        },

        setPageTotal(state, payload) {
            state.pageTotal = payload
        },
    },
    getters:{
        getList(state){
            return state.list
        },

        getResult(state) {
            return state;
        },

        getPageTotal(state) {
            return state.pageTotal;
        },

    },
    actions:{

        /**
         * 获取学生list
         * @param ctx
         * @param pager
         * @returns {Promise<void>}
         */
        async getStudentList(ctx,pager){
            const resp = await api.getList(pager);
            storage.set('token',resp.data.data.token);
            if (resp.data.errno === 408){
                ctx.commit('setResult',true)
                ctx.commit('setPageTotal',resp.data.data.total)
                ctx.commit('setList',resp.data.data.list)
                console.log("student",resp.data.data.list)
            } else {
                ctx.commit('setResult',false)
            }
        },

        /**
         * 条件查询
         * @param ctx
         * @param pager 查询条件与分页数据
         * @returns {Promise<void>}
         */
        async selectByKey(ctx,pager) {
            const resp = await api.selectByKey(pager);
            storage.set('token', resp.data.data.token);
            if (resp.data.errno === 408) {
                ctx.commit('setResult', true)
                ctx.commit('setPageTotal', resp.data.data.total)
                ctx.commit('setList', resp.data.data.list)
            } else {
                ctx.commit('setResult', false)
            }

        }
    },
}