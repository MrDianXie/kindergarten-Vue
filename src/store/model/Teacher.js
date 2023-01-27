import * as teacherAPI from '@/api/Teacher'
import storage from "@/utils/storage";

export default {
    //开启命名空间
    namespaced : true,


    state:{
        list: [],
        loading: false,
        pageTotal: null,//总页数
        page: null,//当前页
    },

    mutations: {

        setList(state,list){
            state.list = list;
        },

        setLoading(state, payload) {
            state.loading = payload
        },

        setPageTotal(state,payload){
            state.pageTotal = payload
        }

    },

    getters: {

        getList(state){
            return state.list;
        },

        //获取状态
        getLoading(state){
            return state.loading;
        },

        getPageTotal(state){
            return state.pageTotal;
        }

    },

    actions: {

        /**
         * 通过id删除一条教师信息
         * @param ctx
         * @param uid 教师id
         */
        async del(ctx,uid){
            //设置加载状态
            ctx.commit('setLoading',true)
            const resp = await teacherAPI.del(uid);
            console.log("响应结果",resp)
            ctx.commit('setLoading',false)
        },

        /**
         * 请求教师列表数据
         * @param ctx
         * @param pager
         * @returns {Promise<void>}
         */
        teacherList: async function (ctx,pager) {
            //设置加载中
            ctx.commit("setLoading", true)
            const resp = await teacherAPI.getTeacherList(pager);
            if (resp.data.errno === 408) {
                // console.log(resp.data.data.list)
                //提交总页数
                ctx.commit('setPageTotal',resp.data.data.list['total'])
                //提交教师列表
                ctx.commit("setList", resp.data.data.list["records"]);
                //更新token
                storage.set('token', resp.data.data.token);
            } else {
                console.log("getTeacherList", '操作失败')
            }
            //加载结束
            ctx.commit("setLoading", false)
        },

        /**
         * 查询教师
         * @param ctx
         * @param pager
         * @param selectKey
         * @returns {Promise<void>}
         */
        async selectTeacher(ctx,pager){
           ctx.commit("setLoading",true)
           const resp = await teacherAPI.selectTeacher(pager);
           if (resp.data.errno === 408){
               console.log("查询成功",resp.data.data.list)
               //提交总页数
               ctx.commit('setPageTotal',resp.data.data.list['total'])
               //将查询的结果存入list
               ctx.commit('setList',resp.data.data.list['records'])
               //更新token
               storage.set('token',resp.data.data.token)
           } else {
               console.log("查询教师失败")
           }
           ctx.commit("setLoading",false)
        },

        /**
         * 新增教师
         * @param ctx
         * @param teacher
         * @returns {Promise<void>}
         */
        async insert(ctx,teacher){

            ctx.commit('setLoading',true)
            const resp = await teacherAPI.insert(teacher);
            if (resp.data.errno === 408){
                console.log("新增成功")
            } else {
                console.log("新增失败")
            }

            ctx.commit('setLoading',false)
        }
    },

}