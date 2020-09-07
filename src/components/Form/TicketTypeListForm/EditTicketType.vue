<template>
  <div class="edit_basic">
    <!-- 编辑基础信息弹框 -->
    <el-dialog title="添加/修改票类信息" :visible.sync="dialogVisible">
      <el-form ref="EditTicketTypeForm" :model="form" :rules="rules">
        <el-form-item label="票类名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="选择票类型" :label-width="formLabelWidth" prop="type">
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
      <div slot="footer" class="dialog-footer" v-loading="loading">
        <el-button @click="handleDialogVisible">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as API from "@/axios/api";

export default {
  name: "EditTicketType",
  props: {
    onchange: {
      type: Function,
    },
  },
  components: {},
  filters: {},
  data() {
    return {
      dialogVisible: false,
      form: {
        id: "",
        name: "",
        type: "",
        price: 0,
        number: 0,
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        price: [{ required: true, message: "请输入票价", trigger: "blur" }],
        type: [{ required: true, message: "请选择票类型", trigger: "change" }],
        number: [
          { required: true, message: "请输入开放票数", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
      loading: false,
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
        if (res.data.msg === "200") {
          let data = res.data.data.map((el) => ({
            label: el.ticketing_type_name,
            value: el.ticketing_type_code,
          }));
          this.types = data || [];
        }
      });
    },
    // 新增/编辑票类支持
    addData(params) {
      this.loading = true;
      let request = this.isEdit
        ? API.EditTicketInformationTable
        : API.InsertTicketInformationTable;
      request(params).then((res) => {
        this.loading = false;
        if (res.data.msg === "200") {
          console.log(res);
          let data = res.data.data[0];
          let item = {
            id: data.ticket_information_code,
            name: data.ticket_information_name,
            type: data.ticket_type_code,
            price: data.ticket_information_money,
            number: data.number_child_tickets_open,
          };
          this.onchange(item);
          this.handleDialogVisible();
          this.$message.success("操作成功！");
        } else {
          this.$message.error("操作失败！");
        }
      });
    },
    /**
     * 功能函数 *
     */
    // 点击提交
    handleSubmit() {
      this.$refs.EditTicketTypeForm.validate((valid) => {
        if (valid) {
          let params = {
            ticket_information_name: this.form.name,
            ticket_type_code: this.form.type,
            ticket_information_money: this.form.price + "",
            number_child_tickets_open: this.form.number + "",
          };
          if (this.isEdit) {
            params.ticket_information_code = this.form.id;
          }
          this.addData(params);
        }
      });
    },
    /**
     * 监听弹框唤起
     * @param {object} item 票类参数
     */
    handleDialogVisible(item) {
      this.dialogVisible = !this.dialogVisible;
      this.isEdit = false;
      console.log(item);
      if (item && this.dialogVisible) {
        this.isEdit = true;
        this.form = item;
      }

      if (!this.dialogVisible) {
        this.form = {
          id: "",
          name: "",
          type: "",
          price: 0,
          number: 0,
        };
      }
    },
  },
};
</script>
<style lang="less" scope>
.el-form-item .el-form-item {
  margin-bottom: 22px;
}
</style>
