import * as api from '@/api/Parent'
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

        async list(ctx){
            const resp = await api.list();
            if (resp.data.errno === 408){
                storage.setToken(resp.data.data.token)
                ctx.commit('setList',resp.data.data.parentList)
            } else {
                console.log('请求失败')
            }
        }
    }
}