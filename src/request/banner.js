import axios from '../utils/http';

 //请求轮播图列表数据
export function getBannerList() {
    let res = axios.get('/bannerlist')
    return res
  }

//添加轮播图
export function addBanner(data) { 
  let res = axios.post('/banneradd',data)
  return res
 }

//编辑轮播图
export function editBanner(data){
  let res = axios.post('/banneredit',data)
  return res  
}

//删除轮播图
export function delBanner(id){
  let res = axios.post('/bannerdelete',{id:id})
  return res
}



