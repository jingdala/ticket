<template>
  <div class="warning">
    <div class="warning-num">
      <div class="warning_white"></div>
      <div class="warning_blue"></div>
      <div class="warning_yellow"></div>
      <div class="warning_red"></div>
      <div class="warning_today">
        <div data-v-61c027cd class="warning_today_text">
          <div data-v-61c027cd class="warning_today_icon icon_move"></div>
          今日参观人数：{{number}}
        </div>
      </div>
    </div>
    <div class="warning_right">
      预警数：{{count}}
      <el-button
        type="button"
        class="el-button el-button--default"
        style="margin-left: 20px;"
        @click="setClick"
      >
        <span>设置</span>
      </el-button>
    </div>

    <el-dialog title="修改预警值" :visible.sync="dialogVisible" width="50%" @closed="handleClose">
      <el-form :model="ruleForm" ref="ruleForm" label-width="50px" class="ruleForm">
        <el-form-item label="预警值" prop="count">
          <el-input-number v-model="ruleForm.count" @change="handleChange" :min="1" :max="1500"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
let count = null;
export default {
  name: "CommonCountHeader",
  data() {
    return {
      count: 1000,
      number: 22,
      dialogVisible: false,
      ruleForm: {
        count: 1000,
      },
    };
  },
  methods: {
    setClick() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.$refs.ruleForm.resetFields();
    },
    handleChange(value) {
      console.log(value);
      this.count = value;
    },
    saveClick(ruleForm) {
      // console.log(count);
      // this.ruleForm.count = count;
      this.dialogVisible = false;
    },
  },
};
</script>
<style lang="less" scoped>
.warning {
  height: 50px;
  width: 100%;
  position: relative;
  background-color: #fff;
  .warning-num {
    width: 60%;
    position: relative;
    .warning_white {
      width: 60%;
      position: absolute;
      left: 0;
      background-image: linear-gradient(90deg, #fff, #6cf);
      height: 50px;
    }
    .warning_blue {
      width: 20%;
      position: absolute;
      left: 60%;
      background-image: linear-gradient(90deg, #6cf, #ff0);
      height: 50px;
    }
    .warning_yellow {
      width: 15%;
      position: absolute;
      left: 80%;
      background-color: #ff0;
      height: 50px;
    }
    .warning_red {
      width: 5%;
      left: 95%;
      position: absolute;
      background-image: linear-gradient(90deg, #ff0, red);
      height: 50px;
    }
    .warning_today {
      width: 1%;
      left: 0;
      position: absolute;
      height: 50px;
      .warning_today_text {
        position: absolute;
        left: 100%;
        width: 160px;
        height: 50px;
        display: flex;
        align-items: center;
        align-content: center;
        font-size: 14px;
        .warning_today_icon {
          width: 16px;
          height: 16px;
          border-radius: 12px;
          background-color: red;
          margin-right: 10px;
          animation: icon_move 1s linear 0s infinite;
        }
      }
    }
  }
  .warning_right {
    position: absolute;
    top: 0;
    right: 20px;
    height: 50px;
    display: flex;
    align-items: center;
    align-content: center;
    font-size: 14px;
  }
}
@keyframes icon_move {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}
.el-form-item {
  display: flex;
  white-space: nowrap;
  .el-button {
    background-color: #dcdfe6;
  }
}
</style>