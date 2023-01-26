/**
 * 获取教师列表API
 * @returns {Promise<void>}
 */

/**
 * 获取教师列表
 * @author XIE
 * @param page
 * @returns {Promise<*>}
 */
export async function getTeacherList(page){
    return axios({
        method: 'GET',
        url: 'http://localhost:8090/admin/teacher/teacherList',
        headers: {
            'X-Admin-Token': store.getters['loginUser/getToken']
        },
        params:{
            current:page,
            size:10
        }
    })
}

/**
 * 通过名字查询教师
 * @author XIE
 * @param selectKey
 * @returns {Promise<*>}
 */
export async function selectTeacher(selectKey){

    return axios({
        method : 'GET',
        headers: {
            'X-Admin-Token': store.getters['loginUser/getToken']
        },
        url: 'http://localhost:8090/admin/teacher/selectTeacher',
        params: {
            selectKey: selectKey
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