import storage from "@/model/storage";
import * as userAPI from '@/api/User'

/**
 * 用户登录模块
 * */

export default {
    //开启名空间
    namespaced: true,

    state: {
        // 存储token
        token:"",
        userInfo: {
            username: "",
            avatar: ""
        },
        codeUrl: "http://localhost:8090/admin/auth/verifyCode",

        loginView: {
            errmsg: "",
            errno: ""
        },

    },

    getters:{
        getToken(state){
            return state.token || storage.get("token");
        },

        getUserInfo(state){
            return state.userInfo;
        },

        //获取验证码
        getCode(state){
            return state.codeUrl
        },

        getLoginView(state){
            return state.loginView
        },

    },

    mutations:{

        // 修改token，并将token存入localStorage
        setToken(state,token) {
            state.token = token;
            storage.set('token', token);
            console.log('store、localstorage保存token成功！');
        },
        delToken(state) {
            state.token = "";
            storage.remove("token");
        },
        // 可选
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },

        setCode(state,codeUrl){
            state.codeUrl = codeUrl;
        },

        setLoginView(state,loginView){
            state.loginView = loginView;
        },
    },

    actions:{
        /**
         * 更改验证码
         * @param ctx
         * @param index
         */
        changeCode(ctx,index){
            if (index ===  1){
                ctx.commit("setCode","http://localhost:8090/admin/auth/verifyCode?")
            }
            userAPI.getVerCode(index).then(res =>{
                //设置返回的url
                ctx.commit("setCode",res.codeUrl)
            })


        },


        /**
         * 登录
         * @param ctx
         * @param loginInfo
         */
        login(ctx,loginInfo) {
            return userAPI.login(loginInfo);
        }
    }



}