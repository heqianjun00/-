import axios from '../utils/http';

 //请求商品规格列表数据
export function getSpecsList(params) {
    let res = axios.get('/specslist',{params:params})
    return res
  }

//添加商品规格
export function addSpecs(data) { 
  let res = axios.post('/specsadd',data)
  return res
 }

//编辑商品规格
export function editSpecs(data){
  let res = axios.post('/specsedit',data)
  return res  
}

//删除商品规格
export function delSpecs(id){
  let res = axios.post('/specsdelete',{id:id})
  return res
}
//商品规格总数
export function specsCount(){
  let res = axios.get('/specscount')
  return res
}

//获取商品规格的所有数据
export function getSpecs(count){
  let res = axios.get('/specslist',{params:{page:1,size:count}})
  return res
}