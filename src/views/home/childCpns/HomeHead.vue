<template>
  <div class="header">
    <div class="logo">
      <div class="text">
        <span>预约平台后台管理系统</span>
      </div>
    </div>
    <div class="menu">
      <div>
        <span @click="setupClick">
          <i class="el-icon-setting"></i>设置
        </span>
        <span @click="logout">退出</span>
      </div>
    </div>

    <!-- 点击设置弹出对话框 -->
    <el-dialog
      title="修改密码"
      :visible.sync="setupdialogVisible"
      width="50%"
      @closed="editDialogClosed"
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px">
        <el-form-item label="原始密码" prop="oldPassword">
          <el-input v-model="ruleForm.oldPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="ruleForm.newPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="再次输入新密码" prop="cnewPassword">
          <el-input v-model="ruleForm.cnewPassword" type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="confirmSave(ruleForm)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
const pwd = window.sessionStorage.getItem("password");
const validatePass1 = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入旧密码"));
  } else if (value.toString().length < 5 || value.toString().length > 18) {
    callback(new Error("密码长度为5 - 18个字符"));
  } else if (value !== pwd) {
    callback(new Error("请输入正确旧密码"));
  } else {
    callback();
  }
};
const validatePass2 = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入新密码"));
  } else if (value.toString().length < 5 || value.toString().length > 18) {
    callback(new Error("密码长度为5 - 18个字符"));
  } else {
    callback();
  }
};
const validatePass3 = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== this.ruleForm.newPassword) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};
export default {
  name: "HomeHead",
  data() {
    return {
      setupdialogVisible: false,
      ruleForm: {
        oldPassword: "",
        newPassword: "",
        cnewPassword: "",
      },
      rules: {
        oldPassword: [
          {
            required: true,
            validator: validatePass1,
            trigger: "blur",
          },
          {
            min: 5,
            max: 18,
            message: "长度在 5 到 18 个字符",
            trigger: "blur",
          },
        ],
        newPassword: [
          {
            required: true,
            validator: validatePass2,
            trigger: "blur",
          },
          {
            min: 5,
            max: 18,
            message: "长度在 5 到 18 个字符",
            trigger: "blur",
          },
        ],
        cnewPassword: [
          {
            required: true,
            validator: validatePass3,
            trigger: "blur",
          },
          {
            min: 5,
            max: 18,
            message: "长度在 5 到 18 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 点击退出操作
    logout() {
      this.$confirm("确定退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$router.push("/login");
          window.sessionStorage.removeItem("username");
          window.sessionStorage.removeItem("password");
          window.sessionStorage.removeItem("token");
          this.$message({
            type: "success",
            message: "已确认退出!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
    // 点击设置操作
    setupClick() {
      this.setupdialogVisible = true;
      console.log("点击了");
    },
    // 退出清空表单
    editDialogClosed() {
      this.$refs.ruleForm.resetFields();
    },
    // 点击确定保存数据
    confirmSave(ruleForm) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          window.sessionStorage.setItem("password", this.ruleForm.cnewPassword);
          console.log("submit");
          this.setupdialogVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #e6e6e6;
  background-color: rgb(191, 79, 77);
  display: flex;
  justify-content: space-between;
  .logo {
    margin-left: 40px;
    line-height: 60px;
    display: flex;
    .text {
      font-size: 26px;
      font-family: "\9ED1\4F53";
      font-weight: 700;
      color: #fff;
    }
  }
  .menu {
    div {
      height: 60px;
      color: #fff;
      text-align: right;
      line-height: 60px;
      box-sizing: border-box;
      cursor: pointer;
      span {
        display: inline-block;
        padding: 0 20px;
      }
      span:hover {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  }
}
</style>