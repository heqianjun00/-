<template>
 <div>
        <el-table
        :data="cateList"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
        prop="id"
        label="ID">
        </el-table-column>
         <el-table-column
        prop="img"
        label="分类图片">
        <template slot-scope="scope">
          <img :src="$imgUrl+scope.row.img" alt="" class="img">
        </template>
        </el-table-column>
        <el-table-column
        prop="catename"
        label="分类名称">
        </el-table-column>
        <el-table-column
        prop="status"
        label="状态">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status == 1">正常</el-tag>
            <el-tag type="warning" v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column
        label="操作">
          <template slot-scope="scope">
              <el-button type="success" icon="el-icon-edit" circle size="small" @click="edit(scope.row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle size="small" @click="del(scope.row.id)"></el-button>
          </template>
        </el-table-column>
    </el-table>

 </div>
</template>

<script>
//vuex中的辅助函数
import {mapActions,mapState} from 'vuex';
import {delCate} from '../../request/cate';
export default {
  props:['info'],
 data(){
 return{
  
 }
 },
 created(){
   this.getCateListAction()
 },
 methods:{
  ...mapActions('cate',['getCateListAction']),
 edit(val){
   this.info.isAdd = false
   this.info.isShow = true
   //这里用子传父的方式（自定义事件），将val传个Index组件，然后Index组件再
   //传给他的子组件Dialog （这样做的目的是考虑的数据传递的安全性）
   this.$emit('setForm',val)
 },
 del(id){
   this.$confirm('此操作将永久删除该目录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delCate(id).then(res=>{
            if(res.code == 200){
                this.$message({
                    type: 'success',
                    message: res.msg
                });
                //刷新列表
                this.getCateListAction()
            }else{
               //弹出错误的提示信息
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error'
                    });
            }
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
 }
 
 },
computed:{
  ...mapState({cateList:state=>state.cate.cateList})
}
}

</script>
<style scoped>
.img{
  width: 100px;
}
</style>