<template>
  <div class="edit_basic">
    <!-- 编辑基础信息弹框 -->
    <el-dialog title="编辑基础信息" :visible.sync="dialogVisible">
      <el-form :model="form" :rules="rules">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" disabled style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="每日开馆时间" :label-width="formLabelWidth">
          <el-select
            v-model="form.date1"
            placeholder="请选择"
            style="width: 180px;margin-right: 10px;"
          >
            <el-option
              v-for="item in times"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>至
          <el-select v-model="form.date2" placeholder="请选择" style="width: 180px;margin-left: 10px;">
            <el-option
              v-for="item in times"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地点" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="举办方" :label-width="formLabelWidth" prop="organizers">
          <el-input v-model="form.organizers" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="注意事项" :label-width="formLabelWidth">
          <ConsiderationsForm
            :onchange="handleOnchangeConsiderations"
            :propsList="form.considerations"
          ></ConsiderationsForm>
        </el-form-item>
        <el-form-item label="封面图片" :label-width="formLabelWidth" prop="imageUrl">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
import ConsiderationsForm from "@/components/Form/ConsiderationsForm";
import { times } from "@/utils/data";

export default {
  name: "EditBasic",
  components: { ConsiderationsForm },
  filters: {},
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "常规展览",
        date1: "9:00",
        date2: "18:00",
        address: "",
        organizers: "",
        considerations: {},
        imageUrl: "",
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        organizers: [
          { required: true, message: "请输入举办方", trigger: "blur" },
        ],
        imageUrl: [
          { required: true, message: "请选择封面图片", trigger: "change" },
        ],
      },
      formLabelWidth: "120px",
      times: times,
    };
  },
  created() {},
  methods: {
    /**
     * 功能函数 *
     */
    // 监听弹框唤起
    handleDialogVisible() {
      this.dialogVisible = !this.dialogVisible;
    },
    // 监听图片上传成功
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 图片上传拦截
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 3;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 监听获取注意事项
    handleOnchangeConsiderations(data) {
      this.form.considerations = data;
    },
  },
};
</script>
<style lang="less" scope>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
