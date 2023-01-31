import * as teacherAPI from '@/api/Teacher'
import * as to from '@/utils/to'
import storage from "@/utils/storage";

export default {
    //开启命名空间
    namespaced : true,


    state:{
        list: [], //教师列表
        loading: false, //加载状态
        pageTotal: null,//总页数
        page: null,//当前页
        result: null, //返回结果
        teacher: null, //单个教师
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
        },

        setResult(state,payload){
            state.result = payload;
        },

        setTeacher(state,teacher){
            state.teacher = teacher;
        }

    },

    getters: {

        getTeacher(state){
            return state.teacher;
        },

        getList(state){
            return state.list;
        },

        //获取状态
        getLoading(state){
            return state.loading;
        },

        getPageTotal(state){
            return state.pageTotal;
        },

        getDelResult(state){
            return state.result
        }

    },

    actions: {

        /**
         * 更新教师信息
         * @param ctx
         * @param teacher 教师信息
         * @returns {Promise<void>}
         */
        async update(ctx,teacher){
            ctx.commit('setLoading',true);
            const resp = await teacherAPI.update(teacher);
            to.overdue(resp);
            if (resp.data.errno === 408){
                storage.set('token',resp.data.data.token)
                ctx.commit('setResult',true);
            } else {
                ctx.commit('setResult',false);
            }
            ctx.commit('setLoading',false);
        },

        /**
         * 批量删除
         * @param ctx
         * @param uids 用户ids
         * @returns {Promise<void>}
         */
        async delAll(ctx,uids){
            ctx.commit('setLoading',true);
            const resp = await teacherAPI.delAll(uids);
            to.overdue(resp);
            if (resp.data.errno === 408){
                storage.set('token',resp.data.data.token)
                ctx.commit('setResult',true);
            } else {
                ctx.commit('setResult',false);
            }
            ctx.commit('setLoading',false);
        },

        /**
         * 通过id删除一条教师信息
         * @param ctx
         * @param uid 教师id
         */
        async del(ctx,uid) {
            //设置加载状态
            ctx.commit('setLoading', true)
            const resp = await teacherAPI.del(uid);
            to.overdue(resp);
            //更新缓存的token
            if (resp.data.errno === 408) {
                storage.set('token', resp.data.data.token)
                ctx.commit('setResult', true);
            } else {
                ctx.commit('setResult', false);
            }
            ctx.commit('setLoading', false);

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
            to.overdue(resp);
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
         * @returns {Promise<void>}
         */
        async selectTeacher(ctx,pager){
           ctx.commit("setLoading",true)
           const resp = await teacherAPI.selectTeacher(pager);
            to.overdue(resp);

           if (resp.data.errno === 408){
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
            to.overdue(resp);
            if (resp.data.errno === 408){
                storage.set("token",resp.data.data.token)
                console.log("新增成功")
            } else {
                console.log("新增失败")
            }

            ctx.commit('setLoading',false)
        },

        /**
         * 通过id查询教师
         * @param ctx
         * @param uid 教师id
         * @returns {Promise<void>}
         */
        async selectById(ctx,uid){
            ctx.commit('setLoading',true)
            const resp = await teacherAPI.selectById(uid);
            to.overdue(resp);
            if (resp.data.errno === 408){
                storage.set("token",resp.data.data.token)
                ctx.commit('setTeacher',resp.data.data.teacher)
            } else {
                console.log("操作失败")
                return;
            }
            ctx.commit('setLoading',false)
        }
    },

}