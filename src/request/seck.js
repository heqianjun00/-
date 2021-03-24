import axios from '../utils/http';

// 秒杀活动列表获取
export function getSeckList(){
    let res = axios.get('/secklist')
    return res
}
//秒杀活动添加
export function addSeck(data) {
    let res = axios.post('/seckadd',data)
    return res
}
//编辑秒杀活动
export function editSeck(data){
    let res = axios.post('/seckedit',data)
    return res
}

//删除秒杀活动
export function delSeck(id){
    let res = axios.post('/seckdelete',{id:id})
    return res
}