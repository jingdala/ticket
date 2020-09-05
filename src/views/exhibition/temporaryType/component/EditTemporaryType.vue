<template>
  <div class="edit_basic">
    <!-- 编辑展览类型弹框 -->
    <el-dialog title="添加/修改展览类型" :visible.sync="dialogVisible">
      <el-form ref="formRef" :model="form" :rules="rules">
        <el-form-item
          label="展览类型"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.name" style="max-width: 400px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleDialogVisible">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as API from "@/axios/api";

export default {
  name: "EditTemporaryType",
  props: {
    getList: {
      type: Function,
    },
  },
  components: {},
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        code: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入展览类型名称", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
      isEdit: false,
    };
  },
  created() {},
  methods: {
    /**
     * 请求函数 *
     */
    // 新增/编辑角色
    addRole(params) {
      this.$myLoading();
      let request = this.isEdit
        ? API.UpdateTemporaryExhibitionTypeData
        : API.InsertTemporaryExhibitionTypeData;
      request(params).then((res) => {
        this.$myLoading().close();
        if (res.data.msg === "200") {
          console.log(res);
          this.handleDialogVisible();
          this.getList();
        }
      });
    },
    /**
     * 功能函数 *
     */
    // 点击提交
    handleSubmit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          let params = {
            temporary_exhibition_type_name: this.form.name,
          };
          if (this.isEdit) {
            params.temporary_exhibition_type_code = this.form.code;
          }
          console.log(params);
          this.addRole(params);
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
      if (item) {
        this.isEdit = true;
        this.form = {
          name: item.temporary_exhibition_type_name,
          code: item.temporary_exhibition_type_code,
        };
      }
    },
  },
};
</script>
<style lang="less"></style>
