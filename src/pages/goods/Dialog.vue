<template>
  <div>
    <el-dialog
      :title="this.info.isAdd ? '新增' : '编辑'"
      :visible.sync="info.isShow"
      @close="clear"
    >
      <el-divider></el-divider>
      <el-form :model="form" ref="form" label-width="120px">
        <!-- ----------------------------------- -->
        <el-form-item label="一级分类" >
          <el-select v-model="form.first_cateid" placeholder="请选择"  @change="firstChange">
            <el-option v-for='item in cateList' :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="二级分类" >
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option v-for='item in secondCateList' :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- ----------------------------------- -->
        <el-form-item label="商品名称" >
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="password">
          <el-input v-model="form.price" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="市场价格" prop="password">
          <el-input v-model="form.market_price" autocomplete="off" ></el-input>
        </el-form-item>
        <!-- ----------------------------------- -->

        <el-form-item label="商品图片" >
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
        <!-- ----------------------------------- -->
         <el-form-item label="商品规格" >
          <el-select v-model="form.specsid" placeholder="请选择"  @change="firstAttrChange">
            <el-option v-for='item in spcesAllList' :key="item.id" :label="item.specsname" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="规格属性值" >
          <el-select v-model="form.specsattr" placeholder="请选择">
            <el-option v-for='(item,index) in secondAttrList' :key="index" :label="item" :value="index"></el-option>
          </el-select>
        </el-form-item>
        <!-- ----------------------------------- -->
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
import { mapState, mapActions } from "vuex";
import { editGoods, addGoods } from "../../request/goods";
export default {
  props: ["info",'params'],
  data() {
    return {
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname:'',
        price:"",
        market_price:"",
        img:"",
        specsid:'',
        specsattr:'',
        status: 1,
        isnew:1,
        ishot:1,
        description:''
      },
      imageUrl:'',
       //创建一个二级分类列表
      secondCateList:[],
      //规格属性值列表
      secondAttrList:[],
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  computed: {
    ...mapState({cateList:state=>state.cate.cateList,goodsList:state=>state.goods.goodsList,spcesAllList:state=>state.specs.spcesAllList})
  },
  created() {
    this.getCateListAction()
    this.getGoodsListAction(this.params)
    this.getSpecsCountAction()
  },
  methods: {
    ...mapActions("goods", ["getGoodsListAction"]),
    ...mapActions("cate", ["getCateListAction"]),
    ...mapActions('specs',['getSpecsCountAction']),
    submit(form) {
    
      this.$refs[form].validate((valid) => {
        if (valid) {
           //将传过来的this.form转变为一个FormData对象
            let formData = new FormData()
                  for(let key in this.form){
                      formData.append(key,this.form[key])
                  }
          //如果是isAdd是true就是新增，否则就是编辑
          if (this.info.isAdd) {
            addGoods(formData).then((res) => {
              
              if (res.code == 200) {
                //弹出成功的提示信息
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: "success",
                });
                //刷新列表
                this.getGoodsListAction(this.params);
                //添加成功后，隐藏弹框
                this.info.isShow = false;
              } 
            });
          } else {
            editGoods(formData).then((res) => {
              if (res.code == 200) {
                //弹出成功的提示信息
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: "success",
                });
                //刷新列表
                this.getGoodsListAction(this.params);
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
        first_cateid: "",
        second_cateid: "",
        goodsname:'',
        price:"",
        market_price:"",
        img:"",
        specsid:'',
        specsattr:'',
        status: 1,
        isnew:1,
        ishot:1,
        description:''
      };
      this.imageUrl = ''
    },

    //接收Index传过来的数据
    dialog(val) {
      //这里赋值时用一下浅拷贝
      this.form = { ...val };
      this.imageUrl = this.$imgUrl+this.form.img
/* ********************************** */

      let index1 = this.spcesAllList.findIndex(item=>item.id == this.form.specsid)
      this.secondAttrList = this.spcesAllList[index1].attrs
/* ********************************** */
      let index2 = this.spcesAllList.findIndex(item=>item.id == this.form.specsid)
      this.secondAttrList = this.spcesAllList[index2].attrs
    },
     //当选择一级分类改变时，它下面的二级分类显示出来
    firstChange(){
      let index = this.cateList.findIndex(item=>item.id == this.form.first_cateid)
      this.secondCateList = this.cateList[index].children
      this.form.second_cateid = '' //每次改变一级分类内容时，先前选的二级分类内容清空
    },
    //规格属性值列表
    firstAttrChange(){
        let index = this.spcesAllList.findIndex(item=>item.id == this.form.specsid)
        this.secondAttrList = this.spcesAllList[index].attrs
        this.form.specsattr = ''
    },
    handleChage(res, file){
      this.imageUrl = URL.createObjectURL(res.raw); //显示
        this.form.img = res.raw //用于上传
    }
  },
  components: {},
};
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