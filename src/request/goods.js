import axios from '../utils/http';



 //请求商品管理列表数据
export function getGoodsList(params) {
    let res = axios.get('/goodslist',{params:params})
    return res
  }

//添加商品管理
export function addGoods(data) { 
  let res = axios.post('/goodsadd',data)
  return res
 }

//编辑商品管理
export function editGoods(data){
  let res = axios.post('/goodsedit',data)
  return res  
}

//删除商品管理
export function delGoods(id){
  let res = axios.post('/goodsdelete',{id:id})
  return res
}
//商品总数
export function goodsCount(){
  let res = axios.get('/goodscount')
  return res
}


