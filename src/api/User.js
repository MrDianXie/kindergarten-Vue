

/**
 * 登录API
 * @author XIE
 * @param loginInfo
 */
export async function login(loginInfo){
    return await axios({
        method: "POST",
        url: "http://localhost:8090/admin/auth/login",
        data: {
            username: loginInfo.username,
            password: loginInfo.password,
            code: loginInfo.code,
            autoLogin: loginInfo.autoLogin
        }
    })
}

/**
 * 获取验证码API
 * @author XIE
 */
export async function getVerCode(index){
    return {
        index: index,
        codeUrl : "http://localhost:8090/admin/auth/verifyCode?" + index,
    };
}

/**
 * 检验是否登录
 * @returns {Promise<*>}
 */
export async function whoAmI(){
    return await axios({
        method: 'GET',
        headers:{
            'X-Admin-Token': store.getters['User/getToken']
        },
        url: 'http://localhost:8090/admin/home/whoAmI'
    })
}