<template>
  <div>
    <el-dialog
      :title="this.info.isAdd ? '新增' : '编辑'"
      :visible.sync="info.isShow"
      @close="clear"
    >
      <el-divider></el-divider>
      <el-form :model="form" ref="form" label-width="120px">
        <el-form-item label="属性名" ref="">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="属性值" >
              <div class="box" v-for="(item,index) in list" :key="index">
                  <el-input v-model="list[index]" autocomplete="off" ></el-input>
                  <el-button type="success" size="small" v-if="index == 0" @click="addInp">添加</el-button>
                  <el-button type="danger" size="small" v-else @click="delInp(index)">删除</el-button>
              </div>
          </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">禁用</el-radio>
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
import { mapActions } from "vuex";
import { editSpecs, addSpecs } from "../../request/specs";
export default {
  props: ["info",'params'],
  data() {
    return {
      form: {
        specsname: "",
        attrs:'',
        status: 1,
      },
      list:[''] , //这个数组用来存放输入框的个数
    };
  },
  computed: {
  },
  created() {
  },
  methods: {
    ...mapActions("specs", ["getSpecsListAction"]),
    submit(form) {
    
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.form.attrs = this.list.join(',')
          //如果是isAdd是true就是新增，否则就是编辑
          console.log(this.form.attrs);
          if (this.info.isAdd) {
            console.log(111);
            addSpecs(this.form).then((res) => {
              if (res.code == 200) {
                //弹出成功的提示信息
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: "success",
                });
                //刷新列表
                this.getSpecsListAction(this.params);
                //添加成功后，隐藏弹框
                this.info.isShow = false;
              } 
            });
          } else {
            editSpecs(this.form).then((res) => {
              if (res.code == 200) {
                //弹出成功的提示信息
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: "success",
                });
                //刷新列表
                this.getSpecsListAction(this.params);
                //编辑成功后，隐藏弹框
                this.info.isShow = false;
              } else {
                //弹出错误的提示信息
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: "error",
                });
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    //弹框消失后重置弹框中输入的数据
    clear() {
      this.form = {
        specsname: "",
        attrs:'',
        status: 1,
      };
      this.list = ['']
    },

    //接收Index传过来的数据
    dialog(val) {
      //这里赋值时用一下浅拷贝
      this.form = { ...val };
      this.list = JSON.parse(JSON.stringify(this.form.attrs))
    },
    addInp(){
      this.list.push('')
    },
    delInp(index){
      this.list.splice(index,1)
    }
  },
  components: {},
};
</script>
<style scoped>
.box{
  display: flex;
  margin-bottom: 5px;
}
</style>