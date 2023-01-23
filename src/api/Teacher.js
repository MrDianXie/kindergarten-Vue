/**
 * 获取教师列表API
 * @returns {Promise<void>}
 */
import qs from 'qs';

export async function getTeacherList(){
    return axios({
        method: 'GET',
        url: 'http://localhost:8090/admin/teacher/teacherList'
    })
}

/**
 * 通过名字查询教师
 * @param teacherInfo
 * @returns {Promise<*>}
 */
export async function selectTeacher(selectKey){
    return axios({
        method : 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: 'http://localhost:8090/admin/teacher/selectTeacher',
        data : qs.stringify({selectKey : selectKey}),
    })
}