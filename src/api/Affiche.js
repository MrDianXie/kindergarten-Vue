
/**
 * 分页查询
 * @param pager 分页参数
 * @returns {Promise<*>}
 */
export async function list(pager) {
    return axios({
        method: 'GET',
        url: 'http://localhost:8090/admin/affiche/list',
        headers:{
            'X-Admin-Token': store.getters['User/getToken']
        },
        params:{
            current: pager.page,
            size: pager.size
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
        url: 'http://localhost:8090/admin/affiche/selectByKey',
        params: {
            selectKey: pager.selectKey,
            page: pager.page,
            pageSize: pager.size
        }
    })
}


/**
 * id查询
 * @param aid 公告id
 * @returns {Promise<void>}
 */
export async function selectById(aid){
    return await axios ({
        method:'GET',
        url:'http://localhost:8090/admin/affiche/selectById',
        headers: {
            'X-Admin-Token': store.getters['User/getToken'],
        },
        params:{
            aid:aid
        }
    })
}

/**
 * 新增
 * @param affiche
 * @returns {Promise<*>}
 */
export async function insert(affiche) {
    console.log('affiche',affiche)
    return axios({
        method : 'POST',
        headers: {
            'X-Admin-Token': store.getters['User/getToken'],
        },
        url: 'http://localhost:8090/admin/affiche/insert',
        data: {
            title: affiche.title,
            body: affiche.body,
            uid: affiche.uid,
            state: affiche.state,
        }
    })
}

/**
 * 删除
 * @param aid 公告id
 * @returns {Promise<*>}
 */
export async function del(aid){
    return await axios({
        method: 'DELETE',
        url:'http://localhost:8090/admin/affiche/del',
        headers:{
            'X-Admin-Token': store.getters['User/getToken']
        },
        params:{
            aid: aid
        }
    })
}
/**
 * 批量删除
 * @param aids 选择删除的公告id
 * @returns {Promise<void>}
 */
export async function delAll(aids){
    return axios({
        method: 'DELETE',
        url:'http://localhost:8090/admin/affiche/delAll',
        headers: {
            'X-Admin-Token': store.getters['User/getToken']
        },
        params:{
            aids: aids
        }
    })
}
/**
 * 修改
 * @param affiche 公告信息
 * @returns {Promise<*>}
 */
export async function update(affiche){
    return axios({
        method:'PUT',
        url:'http://localhost:8090/admin/affiche/update',
        headers: {
            'X-Admin-Token': store.getters['User/getToken']
        },
        data:{
            aid: affiche.aid,
            title: affiche.title,
            body: affiche.body,
            uid: affiche.uid,
            state: affiche.state
        }
    })
}

/**
 * 查询未审核的公告
 * @returns {Promise<void>}
 */
export async function selectAudit() {
    return axios({
        url:'http://localhost:8090/admin/affiche/selectAudit',
        headers: {
            'X-Admin-Token': store.getters['User/getToken']
        }
    })

}
