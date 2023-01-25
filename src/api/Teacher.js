/**
 * 获取教师列表API
 * @returns {Promise<void>}
 */
import qs from 'qs';

/**
 * 获取教师列表
 * @author XIE
 * @returns {Promise<*>}
 */
export async function getTeacherList(){
    return axios({
        method: 'GET',
        url: 'http://localhost:8090/admin/teacher/teacherList',
        headers: {
            'X-Admin-Token': store.getters['loginUser/getToken']
        }
    })
}

/**
 * 通过名字查询教师
 * @author XIE
 * @param teacherInfo
 * @returns {Promise<*>}
 */
export async function selectTeacher(selectKey){
    return axios({
        method : 'GET',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-Admin-Token': store.getters['loginUser/getToken']
        },
        url: 'http://localhost:8090/admin/teacher/selectTeacher',
        data : qs.stringify({selectKey : selectKey}),
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