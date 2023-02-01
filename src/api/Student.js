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
        data:{
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


/**
 *  通过id查询学生
 * @param sid 学生id
 * @returns {Promise<void>}
 */
export async function selectById(sid){
    return axios ({
        method:'GET',
        url:'http://localhost:8090/admin/student/selectById',
        headers: {
            'X-Admin-Token': store.getters['User/getToken'],
        },
        params:{
            sid:sid
        }
    })
}

/**
 * 新增一条学生数据
 * @param student
 * @returns {Promise<*>}
 */
export async function insert(student) {
    return axios({
        method : 'POST',
        headers: {
            'X-Admin-Token': store.getters['User/getToken'],
        },
        url: 'http://localhost:8090/admin/student/insert',
        data: {
            sname: student.sname,
            gander: student.gander,
            age: student.age,
            address: student.address,
            cid: student.cid,
            uid: student.uid
        }
    })
}

/**
 * 删除一条学生信息
 * @param sid
 * @returns {Promise<*>}
 */
export async function del(sid){
    return await axios({
        method: 'DELETE',
        url:'http://localhost:8090/admin/student/del',
        headers:{
            'X-Admin-Token': store.getters['User/getToken']
        },
        params:{
            sid: sid
        }
    })
}
/**
 * 批量删除学生
 * @param sids 学生ids
 * @returns {Promise<void>}
 */
export async function delAll(sids){
    return axios({
        method: 'DELETE',
        url:'http://localhost:8090/admin/student/delAll',
        headers: {
            'X-Admin-Token': store.getters['User/getToken']
        },
        params:{
            sids: sids
        }
    })
}
/**
 * 更新学生信息
 * @param student 学生信息
 * @returns {Promise<*>}
 */
export async function update(student){
    console.log("up学生id",student.sid)
    return axios({
        method:'PUT',
        url:'http://localhost:8090/admin/student/update',
        headers: {
            'X-Admin-Token': store.getters['User/getToken']
        },
        data:{
            sid: student.sid,
            sname: student.sname,
            gander: student.gander,
            address: student.address,
            cid: student.cid,
            uid: student.uid
        }
    })
}



