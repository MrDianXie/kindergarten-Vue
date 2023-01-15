import axios from 'axios';
let http = axios.create({
    baseURL: 'http://localhost:8090/', //后台服务地址
    withCredentials: true,
    headers: {

    },
    transformRequest: [function (data,headers) {
        if (headers['Content-type'] === 'multipart/form-data') {
            return data;
        } else {
            return JSON.stringify(data);
        }
    }]
});

function apiAxios(method, url, params, token, response) {
    http({
        method: method,
        url: url,
        headers:{
            'Content-Type': 'application/json;charset=utf-8',
            'token': token
        },
        data: method === 'POST' || method === 'PUT' ? params : null,
        params: method === 'GET' || method === 'DELETE' ? params : null,
    }).then(function (res) {
        response(res);
    }).catch(function (err) {
        response(err);
    })
}

//添加请求拦截器，若token存在则在请求头中加token，不存在也继续请求
http.interceptors.request.use(
    config => {
        // 每次发送请求之前都检测vuex是否存有token,放在请求头发送给服务器
        // Authorization是根据后端自定义字段
        config.headers.Authorization = store.getters.getToken;
        return config;
    },
    error => {
        console.log("在request拦截器显示错误：", error.response)
        return Promise.reject(error);
    }
);


//respone拦截器
http.interceptors.response.use(
    response => {
        // 在status正确的情况下，code不正确则返回对应的错误信息（后台自定义为200是正确，并且将错误信息写在message），正确则返回响应
        return response.data.code == 200 ? response : Promise.reject(response.data.message);
    },
    error => {
        // 在status不正确的情况下，判别status状态码给出对应响应
        if (error.response) {
            console.log("在respone拦截器显示错误：", error.response)
            switch (error.response.status) {
                case 401:
                    //可能是token过期，清除它
                    store.commit("delToken");

                    router.replace({ //跳转到登录页面
                        path: '/login',
                        // 将跳转的路由path作为参数，登录成功后跳转到该路由
                        query: { redirect: router.currentRoute.fullPath }
                    });
            }
        }
        return Promise.reject(error.response.data);
    }
);


export default {
    get: function (url, params, token, response) {
        return apiAxios('GET', url, params, token, response)
    },
    post: function (url, params, token, response) {
        return apiAxios('POST', url, params, token, response)
    },
    put: function (url, params, token, response) {
        return apiAxios('PUT', url, params, token, response)
    },
    delete: function (url, params, token, response) {
        return apiAxios('DELETE', url, params, token, response)
    }


}