<template>
 <div>
<el-dialog :title="this.info.isAdd?'新增':'编辑'" :visible.sync="info.isShow" @close="clear">
<el-divider></el-divider>
  <el-form 
  :model="form" 
  ref="form" 
  label-width="120px" 
  :rules="rules">
    <el-form-item label="类型" prop="type">
        <el-radio-group v-model="form.type">
        <el-radio :label=1>目录</el-radio>
        <el-radio :label=2>菜单</el-radio>
        </el-radio-group>
    </el-form-item>
    <el-form-item label="上级" v-if='form.type == 2'>
      <el-select v-model="form.pid" placeholder="顶级菜单">
          <el-option label='顶级菜单' :value=0></el-option>
        <el-option v-for='item in menuList' :key="item.id" :label="item.title" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="名称" prop="title">
      <el-input v-model="form.title" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="图标"  v-if='form.type == 1'>
      <el-input v-model="form.icon" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="地址"  v-if='form.type == 2'>
      <el-input v-model="form.url" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
        <el-radio :label=1>正常</el-radio>
        <el-radio :label=2>禁用</el-radio>
        </el-radio-group>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="info.isShow = false">取 消</el-button>
    <el-button type="primary" @click="submit('form')">提 交</el-button>
  </div>
</el-dialog>
 </div>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import {addMenu,editMenu} from '../../request/menu';
export default {
props:['info'],
 data(){
 return{
        form: {
          pid: 0,
          title: '',
          icon: '',
          type: 1,
          url:'',
          status: 1
        },
        rules: {
         type: [
            { required: true, message: '请选择类型', trigger: 'blur' },
          ],
         title: [
            { required: true, message: '请选择名称', trigger: 'blur' },
          ],
          status: [
            { required: true, message: '请选择状态', trigger: 'blur' },
          ],
        }

 }
 },
 computed:{
     ...mapState({menuList:state=>state.menu.menuList})
 },
 created(){
   
 },
 methods:{
     ...mapActions('menu',['getMenuListAction']),
     submit(form){
         //使用refs时，form表单上一定要有ref属性
          this.$refs[form].validate((valid) => {
          if (valid) {
             //如果是isAdd是true就是新增，否则就是编辑
             if(this.info.isAdd){
                  addMenu(this.form).then(res=>{
                  if(res.code == 200){
                      //弹出成功的提示信息
                       this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'success'
                    });
                    //刷新列表
                    this.getMenuListAction()
                    //添加成功后，隐藏弹框
                    this.info.isShow = false
                  }else{
                      //弹出错误的提示信息
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error'
                    });
                  }
              })
             }else{
                editMenu(this.form).then(res=>{
                    if(res.code == 200){
                        //弹出成功的提示信息
                       this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'success'
                    });
                     //刷新列表
                    this.getMenuListAction()
                    //添加成功后，隐藏弹框
                    this.info.isShow = false
                    }else{
                         //弹出错误的提示信息
                        this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error'
                    });
                    }
                })
             }
          } else {
            return false;
          }
        });
      },
    //弹框消失后重置弹框中输入的数据
    clear(){
        this.form = {
          pid: 0,
          title: '',
          icon: '',
          type: 1,
          url:'',
          status: 1
        }
    },
    //接收Index传过来的数据
    dialog(val){
      //这里赋值时用一下浅拷贝
      this.form = {...val}
    }
 },
 components:{}
}

</script>
<style scoped>
</style>