<template>
 <div>
      <el-table
        :data="specsList"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
        prop="id"
        label="ID">
        </el-table-column>
        <el-table-column
        prop="specsname"
        label="规格颜色">
       
        </el-table-column>
         <el-table-column
        prop="attrs"
        label="规格属性">
         <template slot-scope="scope">
            <el-tag type="success"  v-for='item in scope.row.attrs' :key="item">{{item}}</el-tag>
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
     <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[5, 10, 15, 20]"
              layout="total, sizes, prev, pager, next, jumper"
              :total='specsCount'>
        </el-pagination>

 </div>
</template>

<script>
//vuex中的辅助函数
import {mapActions,mapState} from 'vuex';
import {delSpecs} from '../../request/specs';

export default {
  props:['info','params'],
 data(){
 return{}
 },
 created(){
     this.getSpecsListAction(this.params)
 },
 methods:{
     ...mapActions('specs',['getSpecsListAction']),
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
          delSpecs(id).then(res=>{
            if(res.code == 200){
                this.$message({
                    type: 'success',
                    message: res.msg
                });
                //刷新列表
                this.getSpecsListAction(this.params)
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
      },
    handleSizeChange(val) {
            this.params.size = val
            this.getSpecsListAction(this.params)
          },
      handleCurrentChange(val) {
       this.params.page = val
       this.getSpecsListAction(this.params)
      }
 },
 components:{},
 computed:{
     ...mapState({specsList:state=>state.specs.specsList,specsCount:state=>state.specs.specsCount})
    }

}

</script>
<style scoped>
.el-tag{
  margin-right:3px ;
}
</style>