/**
 * 获取教师列表
 * @returns {Promise<void>}
 */
export async function list() {
    return await axios({
        method:'GET',
        url:'http://localhost:8090/admin/teacher/list',
        headers: {
            'X-Admin-Token': store.getters['User/getToken']
        },
    })
}

/**
 * 更新教师信息
 * @param teacher 教师信息
 * @returns {Promise<*>}
 */
export async function update(teacher){
    return axios({
        method:'PUT',
        url:'http://localhost:8090/admin/teacher/update',
        headers: {
            'X-Admin-Token': store.getters['User/getToken']
        },
        data:{
            uid: teacher.uid,
            username: teacher.username,
            gander: teacher.gander,
            email: teacher.email,
            phone: teacher.phone
        }
    })
}

/**
 * 批量删除教师
 * @param uids 用户ids
 * @returns {Promise<void>}
 */
export async function delAll(uids){
    return axios({
        method: 'DELETE',
        url:'http://localhost:8090/admin/teacher/deleteAll',
        headers: {
            'X-Admin-Token': store.getters['User/getToken']
        },
        params:{
            uids: uids
        }
    })
}

/**
 * 获取教师列表
 * @author XIE
 * @param pager
 * @returns {Promise<*>}
 */
export async function getTeacherList(pager){
    return axios({
        method: 'GET',
        url: 'http://localhost:8090/admin/teacher/teacherList',
        headers: {
            'X-Admin-Token': store.getters['User/getToken']
        },
        params:{
            current:pager.page,
            size:pager.size
        }
    })
}

/**
 *  通过id查询教师
 * @param uid 教师id
 * @returns {Promise<void>}
 */
export async function selectById(uid){
    return axios ({
        method:'GET',
        url:'http://localhost:8090/admin/teacher/selectById',
        headers: {
            'X-Admin-Token': store.getters['User/getToken'],
        },
        params:{
            uid:uid
        }
    })
}

/**
 * 通过名字查询教师
 * @author XIE
 * @param pager 分页数据
 * @returns {Promise<*>}
 */
export async function selectTeacher(pager){
    return axios({
        method : 'GET',
        headers: {
            'X-Admin-Token': store.getters['User/getToken'],
        },
        url: 'http://localhost:8090/admin/teacher/selectTeacher',
        params: {
            selectKey: pager.selectKey,
            page: pager.page,
            pageSize: pager.size
        }
    })
}


/**
 * 新增教师
 * @param teacher
 * @returns {Promise<*>}
 */
export async function insert(teacher) {
    return axios({
        method: 'POST',
        headers: {
            'X-Admin-Token': store.getters['User/getToken']
        },
        url:'http://localhost:8090/admin/teacher/insert',
        data: {
            username: teacher.username,
            gander: teacher.gander,
            phone: teacher.phone,
            email: teacher.email,
        },
    })

}


/**
 * 删除
 * @param uid 教师id
 * @returns {Promise<*>}
 */
export async function del(uid) {
    return await axios({
        method: 'DELETE',
        url:'http://localhost:8090/admin/teacher/delete',
        headers:{
            'X-Admin-Token': store.getters['User/getToken']
        },
        params:{
            uid: uid
        }
    })
}