<template>
 <div>
<el-dialog :title="this.info.isAdd?'新增':'编辑'" :visible.sync="info.isShow" @close="clear">
<el-divider></el-divider>
  <el-form 
  :model="form" 
  ref="form" 
  label-width="120px" 
  :rules="rules">

    <el-form-item label="上级分类"  prop="pid">
      <el-select v-model="form.pid" placeholder="顶级菜单">
          <el-option label='顶级菜单' :value=0></el-option>
        <el-option v-for='item in cateList' :key="item.id" :label="item.catename" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="分类名称" prop="catename">
      <el-input v-model="form.catename" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="分类图片"  v-if='form.pid != 0'>
      <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :auto-upload='false'
          :on-change="handleChage">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
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
import {addCate,editCate} from '../../request/cate';
export default {
props:['info'],
 data(){
 return{
        form: {
          pid: 0,
          catename: '',
          img: '',
          status: 1
        },
        rules: {
         pid: [
            { required: true, message: '请选择', trigger: 'blur' },
          ],
         catename: [
            { required: true, message: '请选择名称', trigger: 'blur' },
          ],
          status: [
            { required: true, message: '请选择状态', trigger: 'blur' },
          ],
        },
        imageUrl: ''

 }
 },
 computed:{
     ...mapState({cateList:state=>state.cate.cateList})
 },
 created(){
   
 },
 methods:{
     ...mapActions('cate',['getCateListAction']),
     submit(form){
         //使用refs时，form表单上一定要有ref属性
          this.$refs[form].validate((valid) => {
          if (valid) {
            //将传过来的this.form转变为一个FormData对象
                  let formData = new FormData()
                  for(let key in this.form){
                      formData.append(key,this.form[key])
                  }
             //如果是isAdd是true就是新增，否则就是编辑
             if(this.info.isAdd){
               
                  addCate(formData).then(res=>{
                  if(res.code == 200){
                      //弹出成功的提示信息
                       this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'success'
                    });
                    //刷新列表
                    this.getCateListAction()
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
                editCate(formData).then(res=>{
                    if(res.code == 200){
                        //弹出成功的提示信息
                       this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'success'
                    });
                     //刷新列表
                    this.getCateListAction()
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
          catename: '',
          img: '',
          status: 1
        }
        this.imageUrl = ''
    },
    //接收Index传过来的数据
    dialog(val){
      //这里赋值时用一下浅拷贝
      this.form = {...val}

    },
      handleChage(res, file) {
        this.imageUrl = URL.createObjectURL(res.raw); //显示
        this.form.img = res.raw //用于上传
      },
 },
 components:{}
}

</script>
<style scoped>
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #d9d9d9;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>