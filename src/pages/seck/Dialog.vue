<template>
  <div>
    <el-dialog
      :title="this.info.isAdd ? '新增' : '编辑'"
      :visible.sync="info.isShow"
      @close="clear"
    >
      <el-divider></el-divider>
      <el-form :model="form" ref="form" label-width="120px" :rules="rules">
        <el-form-item label="活动名称" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

      <el-form-item>
         <el-date-picker
          v-model="value"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="center"
          @change="getTime">
        </el-date-picker>
      </el-form-item>

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
          <el-form-item label="选择商品" >
          <el-select v-model="form.goodsid" placeholder="请选择">
            <el-option v-for='item in goodsList' :key="item.id" :label="item.goodsname" :value="item.id"></el-option>
          </el-select>
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
import { mapState, mapActions } from "vuex";
import { editSeck, addSeck } from "../../request/seck";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        title: "",
        begintime: "",
        endtime:'',
        first_cateid:'',
        second_cateid:'',
        goodsid:'',
        status: 1,
      },
      //创建一个二级分类列表
      secondCateList:[],
      defaultProps: {
        children: "children",
        label: "title",
      },
      rules: {
        title: [
          { required: true, message: "请填写活动名称", trigger: "blur" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
      //用于存放时间输入框的值
      value: [],
      /* **********用于时间输入框**************** */
       pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        /* ************************* */
    };
  },
  computed: {
    ...mapState({cateList:state=>state.cate.cateList,goodsList:state=>state.goods.goodsList})
  },
  created() {
    this.getCateListAction()
    this.getGoodsListAction()
  },
  methods: {
    //在分类框中显示分类列表的内容
    ...mapActions('cate',['getCateListAction']),
    ...mapActions("seck", ["getSeckListAction"]),
    ...mapActions('goods',['getGoodsListAction']),
    submit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          //如果是isAdd是true就是新增，否则就是编辑
          if (this.info.isAdd) {
             addSeck(this.form).then((res) => {
              if (res.code == 200) {
                //弹出成功的提示信息
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: "success",
                });
                //刷新列表
                this.getSeckListAction();
                //添加成功后，隐藏弹框
                this.info.isShow = false;
              } 
            });
          } else {
            editSeck(this.form).then((res) => {
              if (res.code == 200) {
                //弹出成功的提示信息
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: "success",
                });
                //刷新列表
                this.getSeckListAction();
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
        title: "",
        begintime: "",
        endtime:'',
        first_cateid:'',
        second_cateid:'',
        goodsid:'',
        status: 1,
      };
    },

    //接收Index传过来的数据
    dialog(val) {
      //这里赋值时用一下浅拷贝
      this.form = { ...val };
    },
    //当选择一级分类改变时，它下面的二级分类显示出来
    firstChange(){
      let index = this.cateList.findIndex(item=>item.id == this.form.first_cateid)
      this.secondCateList = this.cateList[index].children
      this.form.second_cateid = '' //每次改变一级分类内容时，先前选的二级分类内容清空
    },
    //时间输入框输入时间确定时触发
    getTime(){
     /*  new Date(this.value[0]).getTime()  将标准时间格式化为时间戳 */
      this.form.begintime = new Date(this.value[0]).getTime()
      this.form.endtime = new Date(this.value[1]).getTime()
    }
  },
  components: {},
};
</script>
<style scoped>
</style>