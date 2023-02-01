import * as api from '@/api/Classandgrade'
import * as to from "@/utils/to";
import storage from "@/utils/storage";

export default {
    namespaced: true,

    state: {
        list:[], //班级列表
        pageTotal: null,//总页数
    },

    mutations: {
        setList(state,list){
            state.list = list;
        },

        setPageTotal(state,total){
            state.pageTotal = total
        },
    },
    getters:{
        getList(state){
            return state.list;
        },

        getPageTotal(state){
            return state.pageTotal
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
                storage.set("token",resp.data.data.token)
                ctx.commit("setList", resp.data.data.list)
            } else {
                //请求失败
                console.log('请求失败')
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
                //提交总页数
                ctx.commit('setPageTotal',resp.data.data.total)
                //提交班级列表
                ctx.commit("setList", resp.data.data.list);
                //更新token
                storage.set('token', resp.data.data.token);
            } else {
                console.log('班级分页查询','操作失败')
            }
        }
    }
}