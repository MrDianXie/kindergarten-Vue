/**
 * 获取教师列表API
 * @returns {Promise<void>}
 */
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
export async function selectTeacher(teacherInfo){
    return axios({
        method : 'POST',
        url: 'http://localhost:8090/admin/teacher/selectByName',
        data : {
            selectKey : teacherInfo.selectKey,
            uid: teacherInfo.uid,
        }
    })
}