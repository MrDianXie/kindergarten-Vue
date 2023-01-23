import * as teacherAPI from '@/api/Teacher'

export default {
    //开启命名空间
    namespaced : true,

    state:{

    },

    mutations: {

    },

    getters: {

    },

    actions: {
        async teacherList(){
            return teacherAPI.getTeacherList();
        },

        async selectTeacher(ctx,selectKey){
           return teacherAPI.selectTeacher(selectKey);
        }
    },

}