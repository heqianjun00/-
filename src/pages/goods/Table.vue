<template>
 <div>
      <el-table
        :data="goodsList"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
        prop="firstcatename"
        label="一级分类">
        </el-table-column>
        <el-table-column
        prop="secondcatename"
        label="二级分类">
        </el-table-column>
        <el-table-column
        prop="goodsname"
        label="商品名称">
        </el-table-column>
        <el-table-column
        prop="img"
        label="商品图片">
        <template slot-scope="scope">
          <img :src="$imgUrl+scope.row.img" alt="" class="img">
        </template>
        </el-table-column>
         <el-table-column
        prop="price"
        label="销售价格">
        </el-table-column>
         <el-table-column
        prop="market_price"
        label="市场价格">
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
              :total='goodsCount'>
        </el-pagination>

 </div>
</template>

<script>
//vuex中的辅助函数
import {mapActions,mapState} from 'vuex';
import {delGoods} from '../../request/goods';

export default {
  props:['info','params'],
 data(){
 return{}
 },
 created(){
     this.getGoodsListAction(this.params)
 },
 methods:{
     ...mapActions('goods',['getGoodsListAction']),
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
          delGoods(id).then(res=>{
            if(res.code == 200){
                this.$message({
                    type: 'success',
                    message: res.msg
                });
                //刷新列表
                this.getGoodsListAction(this.params)
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
            this.getGoodsListAction(this.params)
            this.params.page = 1
          },
      handleCurrentChange(val) {
       this.params.page = val
       this.getGoodsListAction(this.params)
      }
 },
 components:{},
 computed:{
     ...mapState({goodsList:state=>state.goods.goodsList,goodsCount:state=>state.goods.goodsCount})
    }

}

</script>
<style scoped>
.img{
  width: 100px;
}
</style>