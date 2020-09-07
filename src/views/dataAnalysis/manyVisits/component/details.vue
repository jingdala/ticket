<template>
  <div class="detail">
    <div class="title">
      <span>基本信息</span>
    </div>
    <div class="info">
      <span>头像:</span>
      <img src alt />
    </div>
    <div class="info">
      <span>名称:</span>
      <span>{{id}}</span>
    </div>
    <div class="info">
      <span>角色:</span>
      <span>
        <template>
          <el-button type="danger" size="mini" @click="setRoleClick">设置角色</el-button>
        </template>
      </span>
    </div>
    <div class="info">
      <span>手机号:</span>
      <span></span>
    </div>
    <div class="info">
      <span>账号状态:</span>
      <span>启用</span>
      <span>
        <template>
          <el-button type="danger" size="mini" @click="disableClick">禁用</el-button>
        </template>
      </span>
    </div>
    <div class="info">
      <span>注册时间:</span>
      <span></span>
    </div>

    <div class="title">
      <span>票务信息</span>
    </div>
    <span class="info">累计预约次数{{count}}次</span>
    <el-table :data="data" border style="width: 100%">
      <el-table-column prop="oddNumber" label="预约单号"></el-table-column>
      <el-table-column prop="name" label="票务名称"></el-table-column>
      <el-table-column prop="showType" label="展览类型"></el-table-column>
      <el-table-column prop="orderType" label="预约类型"></el-table-column>
      <el-table-column prop="contact" label="联系人" width="100px"></el-table-column>
      <el-table-column prop="childCount" label="儿童数"></el-table-column>
      <el-table-column prop="adultCount" label="成人数"></el-table-column>
      <el-table-column prop="totalCount" label="总人数"></el-table-column>
      <el-table-column prop="state" label="预约状态"></el-table-column>
      <el-table-column prop="date" label="创建日期"></el-table-column>
    </el-table>
    <!-- 设置角色对话框 -->
    <el-dialog
      title="设置角色"
      :visible.sync="dialogVisible"
      width="50%"
      @closed="handleClose(ruleForm)"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色选择" prop="role">
          <el-select v-model="ruleForm.role" placeholder="选择角色" style="width:80%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.query.id,
      baseInfo: null,
      dialogVisible: false,
      ruleForm: {
        role: "",
      },
      rules: {
        role: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
      },
      options: [
        {
          value: "选项1",
          label: "安保部门",
        },
      ],
      data: null,
      count: 7,
    };
  },
  created() {
    console.log(this.$route);
  },
  methods: {
    setRoleClick() {
      this.dialogVisible = true;
    },
    handleClose(ruleForm) {
      this.$refs.ruleForm.resetFields();
    },
    disableClick() {
      this.$confirm(
        "是否禁用用户 " + JSON.stringify(this.id) + " 的账号?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style scoped lang='less'>
.detail {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  .title {
    font-size: 18px;
    font-weight: 800;
    line-height: 40px;
  }
  .title:nth-of-type(2) {
    // display: inline-block;
    margin: 30px 0;
  }
  .info {
    height: 35px;
    line-height: 35px;
    span:first-of-type {
      font-size: 14px;
      width: 70px;
      font-weight: 600;
      display: inline-block;
      text-align: right;
    }
    span:nth-of-type(2) {
      margin: 0 10px;
      display: inline-block;
    }
  }
}
</style>