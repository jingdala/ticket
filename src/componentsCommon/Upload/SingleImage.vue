<template>
  <div class="upload-container">
    <!-- 单张图片上传 -->
    <el-upload
      class="img-uploader"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :http-request="uploadImage"
      action=""
    >
      <div class="img-container" v-loading="loading">
        <img v-if="tempUrl" :src="imageUrl" class="img" />
        <i v-else class="el-icon-plus img-uploader-icon"></i>
        <!-- 遮罩层 -->
        <div v-if="tempUrl" class="img-mask">
          <span @click.stop="handlePictureCardPreview">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span @click.stop="rmImage">
            <i class="el-icon-delete"></i>
          </span>
        </div>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="imageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from "@/utils";
import * as API from "@/axios/api";

export default {
  name: "SingleImageUpload",
  props: {
    propsValue: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      tempUrl: "",
      loading: false,
      dialogVisible: false,
    };
  },
  computed: {
    imageUrl() {
      return "http://39.103.135.187:8409/" + this.tempUrl;
    },
  },
  watch: {
    // 监听父组件的传值
    propsValue: {
      handler(newValue, oldValue) {
        console.log(newValue);
        if (newValue === oldValue || !newValue) {
          return;
        }
        this.tempUrl = newValue;
      },
    },
  },
  methods: {
    /**
     * 请求函数 *
     */
    // http上传图片
    uploadImage(param) {
      const formData = new FormData();
      formData.append("files", param.file);
      this.loading = true;
      API.SystemFileUpload(formData)
        .then((res) => {
          console.log("上传图片成功");
          if (res.data.msg === "200") {
            this.tempUrl = res.data.data;
            this.emitInput(res.data.data);
          }
          this.loading = false;
        })
        .catch((response) => {
          console.log("图片上传失败");
          this.loading = false;
        });
    },
    /**
     * 功能函数 *
     */
    // 删除
    rmImage() {
      this.tempUrl = "";
      this.$emit("onchange", "");
    },
    // 传值给父组件
    emitInput(val) {
      this.$emit("onchange", val);
    },
    // 监听图片上传成功
    handleAvatarSuccess(res, file) {
      //   this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 图片上传拦截
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 10;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 10MB!");
      }
      return isJPG && isLt2M;
    },
    // 图片放大
    handlePictureCardPreview() {
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="less" scoped>
.upload-container {
  .img-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .img-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .img-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    border: 1px solid #ccc;
  }
  .img-container {
    position: relative;
    &:hover {
      .img-mask {
        display: block;
      }
    }
    .img-mask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: 100%;
      line-height: 100px;
      background: rgba(0, 0, 0, 0.5);
      display: none;
      color: #fff;
      font-size: 20px;
      span {
        margin: 10px;
      }
    }
  }

  .img {
    width: 100px;
    height: 100px;
    display: block;
  }
}
</style>
