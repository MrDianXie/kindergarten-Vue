import * as api from '@/api/Classandgrade'
import storage from "@/utils/storage";

export default {
    namespaced: true,

    state: {
        list:[]
    },

    mutations: {
        setList(state,list){
            state.list = list;
        }
    },
    getters:{
        getList(state){
            return state.list;
        }
    },
    actions:{

        /**
         * 获取班级列表
         * @param ctx
         * @returns {Promise<void>}
         */
        async getClassList(ctx){
            const resp = await api.getList();
            storage.set("token",resp.data.data.token)
            if (resp.data.errno === 408) {
                ctx.commit("setList", resp.data.data.list)
            } else {
                //请求失败
            }
        }
    }
}