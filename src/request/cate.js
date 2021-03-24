import axios from '../utils/http';

//请求商品分类列表数据
export function getCateList() {
    let res = axios.get('/catelist?istree=1')
    return res
  }

//添加商品分类
export function addCate(data) { 
  let res = axios.post('/cateadd',data)
  return res
 }

//编辑商品分类
export function editCate(data){
  let res = axios.post('/cateedit',data)
  return res  
}

//删除商品分类
export function delCate(id){
  let res = axios.post('/catedelete',{id:id})
  return res
}

