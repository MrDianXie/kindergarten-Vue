
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
            'X-Admin-Token': store.getters['loginUser/getToken']
        },
        params:{
            current:pager.page,
            size:pager.size
        }
    })
}

/**
 * 通过名字查询教师
 * @author XIE
 * @param selectKey 查询条件
 * @param pager 分页数据
 * @returns {Promise<*>}
 */
export async function selectTeacher(pager){
    return axios({
        method : 'GET',
        headers: {
            'X-Admin-Token': store.getters['loginUser/getToken'],
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
            'X-Admin-Token': store.getters['loginUser/getToken']
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
            'X-Admin-Token': store.getters['loginUser/getToken']
        },
        params:{
            uid: uid
        }
    })
}