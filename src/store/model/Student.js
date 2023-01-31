import * as api from '@/api/Student'
import storage from "@/utils/storage";
import * as to from '@/utils/to'

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
            return state.result;
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
            to.overdue(resp);
            if (resp.data.errno === 408){
                storage.set('token',resp.data.data.token);
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
            to.overdue(resp);
            if (resp.data.errno === 408) {
                storage.set('token', resp.data.data.token);
                ctx.commit('setResult', true)
                ctx.commit('setPageTotal', resp.data.data.total)
                ctx.commit('setList', resp.data.data.list)
            } else {
                ctx.commit('setResult', false)
            }

        },

        /**
         * 新增一条学生数据
         * @param ctx
         * @param student
         * @returns {Promise<void>}
         */
        async insert(ctx,student){
            const resp = await api.insert(student);
            to.overdue(resp);
            if (resp.data.errno === 408){
                storage.set("token",resp.data.data.token);
                console.log("新增成功")
                ctx.commit('setResult', true)
            } else {
                ctx.commit('setResult', false)
            }
        },

        /**
         * 删除一条学生信息
         * @param ctx
         * @param sid
         * @returns {Promise<void>}
         */
        async del(ctx,sid){
            const resp = await api.del(sid);
            to.overdue(resp);
            if (resp.data.errno === 408){
                storage.set('token',resp.data.data.token)
                ctx.commit('setResult',true)
            } else {
                ctx.commit('setResult',false)
            }
        },
    },
}