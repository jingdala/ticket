<template>
  <div id="login">
    <div class="login-box">
      <div class="title">
        <div class="text">预约平台后台管理系统</div>
      </div>
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef" label-width="0px">
        <el-form-item></el-form-item>
        <!-- 账号区域 -->
        <el-form-item prop="userName">
          <el-input v-model="loginForm.userName" placeholder="请输入账号"></el-input>
        </el-form-item>
        <!-- 密码区域 -->
        <el-form-item prop="userPwd">
          <el-input v-model="loginForm.userPwd" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item>
          <el-button
            type="primary"
            class="btn"
            size="small"
            @click="loginClick(loginForm)"
            :loading="loading"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import * as API from "../../axios/api.js";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        userName: "",
        userPwd: "",
      },
      rules: {
        userName: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur",
          },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        // 验证密码是否合法
        userPwd: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 5,
            max: 15,
            message: "长度在 5 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      loading: false,
    };
  },
  mounted() {
    this.keyLogin();
  },
  methods: {
    // 登录
    loginClick(loginForm) {
      this.$refs.loginFormRef.validate((valid) => {
        if (valid) {
          this.loading = true;
          API.userlogin(this.loginForm).then((res) => {
            console.log(res.data.msg);
            console.log(res);
            if (res.status !== 200) return this.$message.error("登录失败！");
            this.$message.success("登录成功");
            // window.sessionStorage.setItem("username", this.loginForm.userName);
            // window.sessionStorage.setItem("password", this.loginForm.userPwd);
            window.sessionStorage.setItem("token", res.data.data);
            this.$router.push("/home");
            this.loading = false;
          });
        } else {
          this.$message.error("登录名或密码错误");
          return false;
        }
      });
    },
    // 回车登录
    keyLogin() {
      document.onkeydown = (event) => {
        if (event.keyCode == 13) {
          //回车键的键值为13
          this.loginClick();
        }
      };
    },
  },
};
</script>
<style lang="less" scoped>
#login {
  width: 100%;
  height: 100%;
  background: url("../../assets/img/login/bg.png") no-repeat center/cover;
  background-size: 100% 100%;
  .login-box {
    width: 500px;
    height: 600px;
    position: absolute;
    left: 50%;
    margin-left: -250px;
    top: 50%;
    margin-top: -320px;
    text-align: center;
    .title {
      width: 100%;
      height: 232px;
      margin-bottom: 30px;
      line-height: 232px;
      .text {
        text-align: center;
        font-size: 46px;
        font-family: "\9ED1\4F53";
        font-weight: 700;
        color: #bf4f4d;
      }
    }
    .btn {
      width: 100%;
    }
  }
}
</style>
