import router from '@/router'
import store from '@/store'

export function overdue(resp){
    if (resp.data.errno === 211){
        router.replace({path: '/?result=overTime'}).catch(()=>{});
        store.commit('User/setUser',null);
        store.commit('User/delToken');
    }
}