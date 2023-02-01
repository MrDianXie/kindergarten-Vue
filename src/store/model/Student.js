import * as api from '@/api/Student'
import * as to from '@/utils/to'
import storage from "@/utils/storage";
import * as teacherAPI from "@/api/Teacher";

export default {
    namespaced : true,

    state: {
        list:[],//学生列表
        result: false, //返回结果
        pageTotal: null,//总页数
        student: null, //学生

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
        setStudent(state,student){
            state.student = student;
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

        getStudent(state){
            return state.student;
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
         * 通过id查询学生
         * @param ctx
         * @param sid 学生id
         * @returns {Promise<void>}
         */
        async selectById(ctx,sid){
            const resp = await api.selectById(sid);
            to.overdue(resp);
            if (resp.data.errno === 408){
                console.log('单条',resp.data.data.student)
                storage.set("token",resp.data.data.token)
                ctx.commit('setStudent',resp.data.data.student)
            } else {
                console.log("操作失败")
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

        /**
         * 批量删除
         * @param ctx
         * @param sids 用户ids
         * @returns {Promise<void>}
         */
        async delAll(ctx,sids){
            const resp = await api.delAll(sids);
            to.overdue(resp);
            if (resp.data.errno === 408){
                storage.set('token',resp.data.data.token)
                ctx.commit('setResult',true);
            } else {
                ctx.commit('setResult',false);
            }
        },

        /**
         * 更新学生信息
         * @param ctx
         * @param student 学生信息
         * @returns {Promise<void>}
         */
        async update(ctx,student){
            const resp = await api.update(student);
            to.overdue(resp);
            if (resp.data.errno === 408){
                storage.set('token',resp.data.data.token)
                ctx.commit('setResult',true);
            } else {
                ctx.commit('setResult',false);
            }
        },


    },
}