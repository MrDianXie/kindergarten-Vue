/**
 * 获取家长列表
 * @returns {Promise<void>}
 */
export async function list(){
    return axios({
        method:'GET',
        url: 'http://localhost:8090/admin/parent/list',
        headers: {
            'X-Admin-Token': store.getters['User/getToken']
        },
    })
}