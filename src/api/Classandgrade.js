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

/**
 * 分页查询
 * @param pager 分页参数
 * @returns {Promise<*>}
 */
export async function list(pager) {
    return axios({
        method: 'GET',
        url: 'http://localhost:8090/admin/class/list',
        headers:{
            'X-Admin-Token': store.getters['User/getToken']
        },
        data:{
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
        url: 'http://localhost:8090/admin/class/selectByKey',
        params: {
            selectKey: pager.selectKey,
            page: pager.page,
            pageSize: pager.size
        }
    })
}


/**
 * id查询
 * @param cid 班级id
 * @returns {Promise<void>}
 */
export async function selectById(cid){
    return await axios ({
        method:'GET',
        url:'http://localhost:8090/admin/class/selectById',
        headers: {
            'X-Admin-Token': store.getters['User/getToken'],
        },
        params:{
            cid:cid
        }
    })
}

/**
 * 新增
 * @param classAndGrade
 * @returns {Promise<*>}
 */
export async function insert(classAndGrade) {
    return axios({
        method : 'POST',
        headers: {
            'X-Admin-Token': store.getters['User/getToken'],
        },
        url: 'http://localhost:8090/admin/class/insert',
        data: {
            cname:classAndGrade.cname,
            uid: classAndGrade.uid,
            state: classAndGrade.state,
        }
    })
}

/**
 * 删除
 * @param cid
 * @returns {Promise<*>}
 */
export async function del(cid){
    return await axios({
        method: 'DELETE',
        url:'http://localhost:8090/admin/class/del',
        headers:{
            'X-Admin-Token': store.getters['User/getToken']
        },
        params:{
            cid: cid
        }
    })
}
/**
 * 批量删除
 * @param cids 班级ids
 * @returns {Promise<void>}
 */
export async function delAll(cids){
    return axios({
        method: 'DELETE',
        url:'http://localhost:8090/admin/class/delAll',
        headers: {
            'X-Admin-Token': store.getters['User/getToken']
        },
        params:{
            cids: cids
        }
    })
}
/**
 * 修改
 * @param classAndGrade 班级信息
 * @returns {Promise<*>}
 */
export async function update(classAndGrade){
    return axios({
        method:'PUT',
        url:'http://localhost:8090/admin/class/update',
        headers: {
            'X-Admin-Token': store.getters['User/getToken']
        },
        data:{
            cid: classAndGrade.cid,
            cname: classAndGrade.cname,
            uid: classAndGrade.uid,
            state: classAndGrade.state
        }
    })
}
