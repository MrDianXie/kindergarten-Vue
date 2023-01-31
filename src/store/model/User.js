import storage from "@/utils/storage";
import * as userAPI from '@/api/User'
import * as to from '@/utils/to'

/**
 * 用户登录模块
 * */

export default {
    //开启名空间
    namespaced: true,

    state: {
        // 存储token
        token:"",
        loading: false, //是否正在登录中
        user: null, //登录用户
        codeUrl: "http://localhost:8090/admin/auth/verifyCode", //验证码

        errno: null,
        errmsg: null,

    },

    getters:{

        //获取token
        getToken(state){
            return state.token || storage.get("token");
        },

        //获取用户
        getUser(state){
            return state.user
        },

        //获取登录响应信息
        getLoginResult(state){
            switch (state.errno){
                case 408:
                    return '登录成功'
                case 101:
                case 102:
                    return '账号或密码错误'
                case 103:
                    return '验证码错误'
            }
        },

        //获取验证码
        getCode(state){
            return state.codeUrl
        },

        //获取用户状态
        getStatus(state){
            if (state.loading){
                return 'loading'
            } else if(state.user){
                return 'login'
            } else {
                return 'unlogin'
            }

        }
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


        setLoading(state,payload){
            state.loading = payload;

        },

        setUser(state,payload){
            state.user = payload
        },

        setCode(state,codeUrl){
            state.codeUrl = codeUrl;
        },

        //设置返回状态码
        setErrno(state,errno){
            state.errno = errno;
        },

        //设置返回信息
        setErrMsg(state,msg){
            state.errmsg = msg;
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
         * @returns {Promise<void>}
         */
        async login(ctx,loginInfo) {
            const resp = await userAPI.login(loginInfo);
            console.log('登录操作',resp);
            ctx.commit('setLoading',true);
            if (resp.data.errno === 408){
                //提交token
                ctx.commit('setToken',resp.data.data.token)
                //提交用户信息
                ctx.commit('setUser',resp.data.data.userInfo)

                ctx.commit('setErrno',resp.data.errno)
                ctx.commit('setErrMsg',resp.data.errmsg)

            } else {
                console.log("登录失败")
                ctx.commit('setErrno',resp.data.errno)
                ctx.commit('setErrMsg',resp.data.errmsg)
            }
            ctx.commit('setLoading',false)
        },

        /**
         * 身份验证
         * @param ctx
         * @returns {Promise<void>}
         */
        async whoAmI(ctx){
            console.log("whoAmI:执行")
            const resp = await userAPI.whoAmI()
            ctx.commit('setLoading',true)
            if (resp.data.errno === 408){
                ctx.commit('setUser',resp.data.data)
            } else {
                ctx.commit('setUser',null)
            }
            ctx.commit('setLoading',false)

        }
    }



}