<template>
 <div>
      <el-table
        :data="seckList"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
        prop="title"
        label="活动名称">
        </el-table-column>
        <el-table-column
        prop="begintime"
        label="开始时间">
        <template slot-scope="scope">
         {{scope.row.begintime | standardTime}}
        </template>
        </el-table-column>
        <el-table-column
        prop="endtime"
        label="结束时间">
        <template slot-scope="scope">
         {{scope.row.endtime | standardTime}}
        </template>
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
import {delSeck} from '../../request/seck';

export default {
  props:['info'],
 data(){
 return{}
 },
 created(){
     this.getSeckListAction()
 },
 methods:{
     ...mapActions('seck',['getSeckListAction']),
     edit(val){
       this.info.isAdd = false
       this.info.isShow = true
        this.$emit('setForm',val)
     },
     del(id){
   this.$confirm('此操作将永久删除该目录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delSeck(id).then(res=>{
            if(res.code == 200){
                this.$message({
                    type: 'success',
                    message: res.msg
                });
                //刷新列表
                this.getSeckListAction()
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
 components:{},
 computed:{
     ...mapState({seckList:state=>state.seck.seckList})
    }

}

</script>
<style scoped>
</style>