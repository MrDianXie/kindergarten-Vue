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