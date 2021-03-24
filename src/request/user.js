import axios from '../utils/http';

//管理员登录  
export function userLogin (data) { 
    let res = axios.post('/userlogin',data)
    return res
 }

 //请求管理员列表数据
export function getUserList(params) {
    let res = axios.get('/userlist',{params:params})
    return res
  }

//添加管理员
export function addUser(data) { 
  let res = axios.post('/useradd',data)
  return res
 }

//编辑管理员
export function editUser(data){
  let res = axios.post('/useredit',data)
  return res  
}

//删除管理员
export function delUser(uid){
  let res = axios.post('/userdelete',{uid:uid})
  return res
}
//管理员总数
export function userCount(){
  let res = axios.get('/usercount')
  return res
}


/* 会员 */
// 会员注册

export function register(data){
  let res = axios.post('/register',data)
  return  res
}

// 获取会员列表
export function getMemberList(){
  let res = axios.get('/memberlist')
  return res
}

//编辑会员
export function editMember(data){
  let res = axios.post('/memberedit',data)
  return res
}