import * as api from '@/api/Classandgrade'
import * as to from "@/utils/to";
import storage from "@/utils/storage";

export default {
    namespaced: true,

    state: {
        list:[], //班级列表
        result: false, //返回结果
        pageTotal: null,//总页数
        classAndGrade: null, //学生
    },

    mutations: {
        setList(state,list){
            state.list = list;
        },

        setPageTotal(state,total){
            state.pageTotal = total
        },
        setResult(state, payload) {
            state.result = payload
        },
        setClass(state,classAndGarde){
            state.classAndGrade = classAndGarde;
        },

    },
    getters:{
        getList(state){
            return state.list;
        },

        getPageTotal(state){
            return state.pageTotal
        },

        getResult(state) {
            return state.result;
        },

        getClass(state){
            return state.classAndGrade;
        },
    },
    actions:{

        /**
         * 获取班级列表
         * @param ctx
         * @returns {Promise<void>}
         */
        async getClassList(ctx){
            const resp = await api.getList();
            if (resp.data.errno === 408) {
                ctx.commit('setResult',true)
                storage.set("token",resp.data.data.token)
                ctx.commit("setList", resp.data.data.list)
            } else {
                ctx.commit('setResult',false)
            }
        },

        /**
         * 分页查询班级列表
         * @param ctx
         * @param pager
         * @returns {Promise<void>}
         */
        async getList(ctx,pager){
            const resp = await api.list(pager);
            to.overdue(resp);
            if (resp.data.errno === 408) {
                ctx.commit("setResult",true);
                //提交总页数
                ctx.commit('setPageTotal',resp.data.data.total)
                //提交班级列表
                ctx.commit("setList", resp.data.data.list);
                //更新token
                storage.set('token', resp.data.data.token);
            } else {
                ctx.commit("setResult",false);
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
         * id查询
         * @param ctx
         * @param cid 班级id
         * @returns {Promise<void>}
         */
        async selectById(ctx,cid){
            const resp = await api.selectById(cid);
            to.overdue(resp);
            if (resp.data.errno === 408){
                ctx.commit("setResult",false)
                storage.set("token",resp.data.data.token)
                ctx.commit('setClass',resp.data.data.class)
            } else {
                ctx.commit("setResult",true)
            }
        },

        /**
         * 新增
         * @param ctx
         * @param classAndGarde
         * @returns {Promise<void>}
         */
        async insert(ctx,classAndGarde){
            const resp = await api.insert(classAndGarde);
            to.overdue(resp);
            if (resp.data.errno === 408){
                storage.set("token",resp.data.data.token);
                ctx.commit('setResult', true)
            } else {
                ctx.commit('setResult', false)
            }
        },

        /**
         * 删除
         * @param ctx
         * @param cid 班级id
         * @returns {Promise<void>}
         */
        async del(ctx,cid){
            const resp = await api.del(cid);
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
         * @param cids 班级ids
         * @returns {Promise<void>}
         */
        async delAll(ctx,cids){
            const resp = await api.delAll(cids);
            to.overdue(resp);
            if (resp.data.errno === 408){
                storage.set('token',resp.data.data.token)
                ctx.commit('setResult',true);
            } else {
                ctx.commit('setResult',false);
            }
        },

        /**
         * 修改
         * @param ctx
         * @param classAndGarde 学生信息
         * @returns {Promise<void>}
         */
        async update(ctx,classAndGarde){
            const resp = await api.update(classAndGarde);
            to.overdue(resp);
            if (resp.data.errno === 408){
                storage.set('token',resp.data.data.token)
                ctx.commit('setResult',true);
            } else {
                ctx.commit('setResult',false);
            }
        },
    }
}