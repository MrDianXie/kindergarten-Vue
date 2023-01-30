/**
 *  获取学生列表
 * @param pager 分页参数
 * @returns {Promise<*>}
 */
export async function getList(pager) {
    return axios({
        method: 'GET',
        url: 'http://localhost:8090/admin/student/studentList',
        headers:{
            'X-Admin-Token': store.getters['User/getToken']
        },
        params:{
            current:pager.page,
            size:pager.size
        }
    })
}

/**
 * 条件查询
 * @param pager
 * @returns {Promise<*>}
 */
export async function selectByKey(pager) {
    return axios({
        method : 'GET',
        headers: {
            'X-Admin-Token': store.getters['User/getToken'],
        },
        url: 'http://localhost:8090/admin/student/selectByKey',
        params: {
            selectKey: pager.selectKey,
            page: pager.page,
            pageSize: pager.size
        }
    })
}