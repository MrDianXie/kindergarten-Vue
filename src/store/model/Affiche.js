import * as api from '@/api/Affiche'
import * as to from '@/utils/to';
import storage from "@/utils/storage";
import {selectAudit} from "@/api/Affiche";

export default {
    namespaced: true,

    state: {
        list:[], //列表
        result: false, //返回结果
        pageTotal: null,//总页数
        affiche: null, //公告
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
        setAffiche(state,affiche){
            state.affiche = affiche;
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

        getAffiche(state){
            return state.affiche;
        },
    },
    actions:{

        /**
         * 分页查询列表
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
         * @param aid 公告id
         * @returns {Promise<void>}
         */
        async selectById(ctx,aid){
            const resp = await api.selectById(aid);
            to.overdue(resp);
            if (resp.data.errno === 408){
                ctx.commit("setResult",false)
                storage.set("token",resp.data.data.token)
                ctx.commit('setAffiche',resp.data.data.affiche)
            } else {
                ctx.commit("setResult",true)
            }
        },

        /**
         * 新增
         * @param ctx
         * @param affiche
         * @returns {Promise<void>}
         */
        async insert(ctx,affiche){
            const resp = await api.insert(affiche);
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
         * @param aid 公告id
         * @returns {Promise<void>}
         */
        async del(ctx,aid){
            const resp = await api.del(aid);
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
         * @param aids 选择删除的公告id
         * @returns {Promise<void>}
         */
        async delAll(ctx,aids){
            const resp = await api.delAll(aids);
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
         * @param affiche 公告信息
         * @returns {Promise<void>}
         */
        async update(ctx,affiche){
            const resp = await api.update(affiche);
            to.overdue(resp);
            if (resp.data.errno === 408){
                storage.set('token',resp.data.data.token)
                ctx.commit('setResult',true);
            } else {
                ctx.commit('setResult',false);
            }
        },

        /**
         * 查询未审核的公告
         * @param ctx
         * @returns {Promise<void>}
         */
        async selectAudit(ctx){
            const resp = await api.selectAudit();
            to.overdue(resp);

            if (resp.data.errno === 408){
                storage.set(resp.data.data.token)
                ctx.commit()

            }
        }
    }
}