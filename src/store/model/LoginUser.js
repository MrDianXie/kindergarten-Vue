import storage from "@/utils/storage";
import * as userAPI from '@/api/User'
import store from "@/store";

/**
 * 用户登录模块
 * */

export default {
    //开启名空间
    namespaced: true,

    state: {
        // 存储token
        token:"",
        userInfo: null,
        codeUrl: "http://localhost:8090/admin/auth/verifyCode",

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
    },

    mutations:{

        // 修改token，并将token存入localStorage
        setToken(state,token) {
            state.token = token;
            storage.set('token', token);
            console.log('store、sessionStorage保存token成功！');
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
        },


        async whoAmI(ctx,token){
             await userAPI.whoAmI(token).then(res => {
                 if (res.data.errno === 408){
                     ctx.commit('setUserInfo',res.data.data)
                 } else if (res.data.data === 208){
                     console.log(res.data.data)
                     ctx.commit('loginUser/setUserInfo',null)
                 }
            })
        }
    }



}