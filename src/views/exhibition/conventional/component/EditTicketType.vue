<template>
  <div class="edit_basic">
    <!-- 编辑基础信息弹框 -->
    <el-dialog title="添加/修改票类信息" :visible.sync="dialogVisible" @closed="handleClose">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="票类名称" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="选择票类型" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择" style="width: 400px;">
            <el-option
              v-for="item in types"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="票价" :label-width="formLabelWidth" prop="price">
          <el-input v-model="form.price" type="number" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="开放票数" :label-width="formLabelWidth" prop="number">
          <el-input-number v-model="form.number" :min="0" :max="1000" style="width: 400px;"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleDialogVisible">取 消</el-button>
        <el-button type="primary" @click="handleDialogVisible">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as API from "@/axios/api";

export default {
  name: "EditTicketType",
  components: {},
  filters: {},
  data() {
    return {
      dialogVisible: false,
      form: {
        id: "",
        title: "",
        type: 0,
        price: 0,
        number: 0,
      },
      rules: {
        title: [{ required: true, message: "请输入名称", trigger: "blur" }],
        price: [{ required: true, message: "请输入票价", trigger: "blur" }],
        number: [
          { required: true, message: "请输入开放票数", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
      types: [],
    };
  },
  created() {
    this.getTicketTypeData();
  },
  methods: {
    /**
     * 请求函数 *
     */
    // 获取票类型数据
    getTicketTypeData() {
      API.GetTickeTypeData().then((res) => {
        console.log(res);
        if (res.msg === "200") {
          let data =
            res.data &&
            res.data.map((el) => ({
              label: el.ticketing_type_name,
              value: el.ticketing_type_name,
            }));
          this.types = data || [];
        }
      });
    },
    /**
     * 功能函数 *
     */
    /**
     * 监听弹框唤起
     * @param {object} item 票类参数
     */
    handleDialogVisible(item) {
      this.dialogVisible = !this.dialogVisible;
      if (item) {
        this.form = item;
      }
    },
    handleClose() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>
<style lang="less"></style>
