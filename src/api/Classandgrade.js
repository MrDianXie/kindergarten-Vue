/**
 * 获取班级list
 * @returns {Promise<*>}
 */
export async function getList() {
    return axios({
        method: 'GET',
        url: 'http://localhost:8090/admin/class/classList',
        headers:{
            'X-Admin-Token': store.getters['User/getToken']
        }
    })
}