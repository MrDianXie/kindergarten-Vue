import * as teacherAPI from '@/api/Teacher'
import storage from "@/utils/storage";

export default {
    //开启命名空间
    namespaced : true,


    state:{
        list: [],
    },

    mutations: {

        setList(state,list){
            state.list = list;
        }
    },

    getters: {

        getList(state){
            return state.list;
        }

    },

    actions: {

        /**
         * 请求教师列表数据
         * @param ctx
         * @returns {Promise<void>}
         */
        async teacherList(ctx){
            const resp = await teacherAPI.getTeacherList();

            if (resp.data.errno === 408){
                //提交教师列表
                ctx.commit("setList",resp.data.data.list);
                //更新token
                storage.set('token',resp.data.data.token);

            } else {
                console.log("getTeacherList",'操作失败')
            }
        },

        /**
         * 查询教师
         * @param ctx
         * @param selectKey
         * @returns {Promise<void>}
         */
        async selectTeacher(ctx,selectKey){
           const reps = await teacherAPI.selectTeacher(selectKey);
           if (reps.data.errno === 408){
               //将查询的结果存入list
               ctx.commit('setList',reps.data.data.list)
               //更新token
               storage.set('token',reps.data.data.token)
           } else {
               console.log("查询教师失败")
           }
        },

        /**
         * 新增教师
         * @param ctx
         * @returns {Promise<void>}
         */
        async insert(ctx,teacher){
            const resp = await teacherAPI.insert(teacher);
            if (resp.data.errno === 408){
                console.log("新增成功")
            } else {
                console.log("新增失败")
            }
        }
    },

}