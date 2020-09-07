import splitPane from 'vue-splitpane';
<template>
  <!-- 创建临时展览 -->
  <div class="create_temporary">
    <div class="header">
      <h4>
        <span>创建临时展览</span>
      </h4>
      <div>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </div>
    </div>
    <div style="height:calc(100vh - 290px); overflow: auto;">
      <el-form ref="CreateTemporary" :model="form" :rules="rules">
        <el-form-item label="票务名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" :disabled="isEdit" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="开放时间" :label-width="formLabelWidth" prop="openTime">
          <el-date-picker
            v-model="form.openTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >></el-date-picker>
        </el-form-item>
        <el-form-item label="预约开启时间" :label-width="formLabelWidth" prop="appointmentTime">
          <el-date-picker
            v-model="form.appointmentTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >></el-date-picker>
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
        <el-form-item label="选择临时展览类型" :label-width="formLabelWidth" prop="exhibitionItemType">
          <el-select v-model="form.exhibitionItemType" placeholder="请选择" style="width: 400px;">
            <el-option
              v-for="item in exhibitionItemTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预约支持票类" :label-width="formLabelWidth">
          <TicketTypeListForm :isEdit="true" :onchange="handleOnchange"></TicketTypeListForm>
        </el-form-item>
        <el-form-item label="每场预约票数" :label-width="formLabelWidth" prop="number">
          <el-input-number v-model="form.number" :min="0" :max="1000" style="width: 400px;"></el-input-number>
        </el-form-item>
        <el-form-item label="展览地点" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="举办方信息" :label-width="formLabelWidth" prop="organizers">
          <el-input v-model="form.organizers" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="注意事项" :label-width="formLabelWidth">
          <ConsiderationsForm
            :onchange="handleOnchangeConsiderations"
            :propsList="form.considerations"
          ></ConsiderationsForm>
          <div class="other_list" v-for="(item, index) in form.otherList" :key="index">
            <el-input v-model="item.value" style="width: 400px;margin-right: 10px;"></el-input>
            <el-button icon="el-icon-minus" @click="removeOtherItem(index)" v-if="index > 0"></el-button>
            <el-button
              icon="el-icon-plus"
              @click="addOtherItem"
              v-if="index === 0 && form.otherList.length < 5"
            ></el-button>
          </div>
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
        <el-form-item label="活动介绍" :label-width="formLabelWidth">
          <div class="edit_container">
            <quill-editor
              v-model="form.content"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @change="onEditorChange($event)"
            ></quill-editor>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import TicketTypeListForm from "@/components/Form/TicketTypeListForm";
import ConsiderationsForm from "@/components/Form/ConsiderationsForm";
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { times } from "@/utils/data";
import * as API from "@/axios/api";

const exhibitionItemTypes = [
  { label: "陶器", value: 0 },
  { label: "画展", value: 1 },
];

export default {
  name: "CreateTemporary",
  components: { quillEditor, TicketTypeListForm, ConsiderationsForm },
  filters: {},
  data() {
    return {
      form: {
        id: "",
        name: "",
        openTime: "",
        appointmentTime: "",
        date1: "9:00",
        date2: "18:00",
        exhibitionItemType: "",
        ticketTypes: [],
        number: 1,
        address: "",
        organizers: "",
        considerations: {},
        imageUrl: "",
        content: `使用`,
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        openTime: [
          { required: true, message: "请选择开放日期", trigger: "change" },
        ],
        appointmentTime: [
          { required: true, message: "请选择预约日期", trigger: "change" },
        ],
        exhibitionItemType: [
          { required: true, message: "请选择展品类型", trigger: "change" },
        ],
        number: [
          { required: true, message: "请输入每场预约票数", trigger: "blur" },
        ],
        organizers: [
          { required: true, message: "请输入举办方", trigger: "blur" },
        ],
        imageUrl: [
          { required: true, message: "请选择封面图片", trigger: "change" },
        ],
      },
      formLabelWidth: "140px",
      times: times,
      exhibitionItemTypes: exhibitionItemTypes,
      // 富文本编辑器参数
      editorOption: {},
      isEdit: false,
    };
  },
  created() {
    this.getSelectList();
  },
  methods: {
    /**
     * 请求函数 *
     */
    // 获取临时展览类型数据
    getSelectList() {
      this.$myLoading();
      API.GetTemporaryExhibitionTypeData().then((res) => {
        console.log(res);
        if (res.data.msg === "200") {
          this.exhibitionItemTypes = res.data.data.map((el) => {
            return {
              label: el.temporary_exhibition_type_name,
              value: el.temporary_exhibition_type_code,
            };
          });
        }
        this.$myLoading().close();
      });
    },
    // 新增/编辑展览类型
    addData(params) {
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
      console.log(this.form.openTime);
      this.$refs.CreateTemporary.validate((valid) => {
        if (valid) {
          let params = {
            temporary_exhibition_name: this.form.name, // 临时展览名称
            temporary_opening_start_time: this.form.openTime[0], // 展览开始时间
            temporary_opening_end_time: this.form.openTime[1], // 展览结束时间
            appointment_opening_time: this.form.appointmentTime[0], // 预约开始时间
            appointment_closing_time: this.form.appointmentTime[1], // 预约结束时间
            daily_opening_time: this.form.date1, // 每日开展时间
            daily_closing_time: this.form.date2, // 每日开展时间
            temporary_exhibition_type_code: this.form.exhibitionItemType, // 临时展览类型
            ticket_information_code: this.form.ticketTypes, // 票类支持编号
            number_reservations: this.form.number, // 总票数
            exhibition_address: this.form.address, // 展览地址
            organizer_information: this.form.organizers, // 举办方
            cover_img: this.form.imageUrl, // 封面图片
          };
          // 注意事项
          params = { ...params, ...this.form.considerations };
          if (this.isEdit) {
            params.temporary_exhibition_code = this.form.id;
          }
          // this.addData(params);
        }
      });
    },
    // 监听获取票类支持
    handleOnchange() {},
    // 监听获取注意事项
    handleOnchangeConsiderations(data) {
      this.form.considerations = data;
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
    // 添加注意事项
    addOtherItem() {
      this.form.otherList.push({ value: "" });
    },
    // 删除注意事项
    removeOtherItem(index) {
      console.log(index);
      this.form.otherList.splice(index, 1);
    },
    /**
     * 编辑器相关方法
     */
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
  },
};
</script>
<style lang="less" scope>
.create_temporary {
  .header {
    height: 50px;
    line-height: 50px;
    padding-bottom: 10px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f3f3f3;
  }
  .ql-editor {
    height: 360px;
  }
}

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
.ql-toolbar.ql-snow {
  line-height: 20px;
}
</style>
