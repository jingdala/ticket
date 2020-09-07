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
        <el-form-item
          label="票务名称"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input
            v-model="form.name"
            :disabled="isEdit"
            style="width: 400px;"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="开放时间"
          :label-width="formLabelWidth"
          prop="openTime"
        >
          <el-date-picker
            v-model="form.openTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            >></el-date-picker
          >
        </el-form-item>
        <el-form-item
          label="预约开启时间"
          :label-width="formLabelWidth"
          prop="appointmentTime"
        >
          <el-date-picker
            v-model="form.appointmentTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            >></el-date-picker
          >
        </el-form-item>
        <el-form-item
          label="每日开馆时间"
          :label-width="formLabelWidth"
          prop="time"
        >
          <TimesSelectForm
            @onchange="handleOnchangeTimesSelect"
            :propsValue="[
              details.daily_opening_time,
              details.daily_closing_time,
            ]"
          ></TimesSelectForm>
        </el-form-item>
        <el-form-item
          label="选择临时展览类型"
          :label-width="formLabelWidth"
          prop="exhibitionItemType"
        >
          <el-select
            v-model="form.exhibitionItemType"
            placeholder="请选择"
            style="width: 400px;"
          >
            <el-option
              v-for="item in exhibitionItemTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预约支持票类" :label-width="formLabelWidth">
          <TicketTypeListForm
            :isEdit="true"
            :onchange="handleOnchangeTicketType"
            :propsValue="details.listTicketInformationTable"
          ></TicketTypeListForm>
        </el-form-item>
        <el-form-item
          label="每场预约票数"
          :label-width="formLabelWidth"
          prop="number"
        >
          <el-input-number
            v-model="form.number"
            :min="0"
            :max="1000"
            style="width: 400px;"
          ></el-input-number>
        </el-form-item>
        <el-form-item
          label="展览地点"
          :label-width="formLabelWidth"
          prop="address"
        >
          <el-input v-model="form.address" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item
          label="举办方信息"
          :label-width="formLabelWidth"
          prop="organizers"
        >
          <el-input v-model="form.organizers" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="注意事项" :label-width="formLabelWidth">
          <ConsiderationsForm
            :onchange="handleOnchangeConsiderations"
            :propsValue="details"
          ></ConsiderationsForm>
          <div
            class="other_list"
            v-for="(item, index) in form.otherList"
            :key="index"
          >
            <el-input
              v-model="item.value"
              style="width: 400px;margin-right: 10px;"
            ></el-input>
            <el-button
              icon="el-icon-minus"
              @click="removeOtherItem(index)"
              v-if="index > 0"
            ></el-button>
            <el-button
              icon="el-icon-plus"
              @click="addOtherItem"
              v-if="index === 0 && form.otherList.length < 5"
            ></el-button>
          </div>
        </el-form-item>
        <el-form-item
          label="封面图片"
          :label-width="formLabelWidth"
          prop="imageUrl"
        >
          <SingleImage
            @onchange="handleOnchangeImage"
            :propsValue="details.cover_img"
          ></SingleImage>
        </el-form-item>
        <el-form-item label="活动介绍" :label-width="formLabelWidth">
          <RichText
            @onchange="handleOnchangeRichText"
            :propsValue="details.activity_description"
          ></RichText>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import TicketTypeListForm from "@/components/Form/TicketTypeListForm";
import ConsiderationsForm from "@/components/Form/ConsiderationsForm";
import TimesSelectForm from "@/components/Form/TimesSelectForm";
import SingleImage from "@/componentsCommon/Upload/SingleImage";
import RichText from "@/componentsCommon/RichText";

import * as API from "@/axios/api";

import { mapState } from "vuex";

const exhibitionItemTypes = [
  { label: "陶器", value: 0 },
  { label: "画展", value: 1 },
];

export default {
  name: "CreateTemporary",
  components: {
    TicketTypeListForm,
    ConsiderationsForm,
    TimesSelectForm,
    SingleImage,
    RichText,
  },
  computed: {
    ...mapState({
      // 取得临时展览详情数据
      temporaryDetail: (state) => state.exhibition.temporaryDetail,
    }),
  },
  data() {
    return {
      form: {
        id: "",
        name: "",
        openTime: "",
        appointmentTime: "",
        time: [],
        exhibitionItemType: "",
        ticketTypes: [],
        number: 1,
        address: "",
        organizers: "",
        considerations: {},
        imageUrl: "",
        content: ``,
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
      // 展览类型
      exhibitionItemTypes: [],
      // 是否为编辑状态
      isEdit: true,
      // 详情数据
      details: {},
    };
  },
  created() {
    this.getSelectList();
    this.getDetails();
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
          this.$message.success("操作成功！");
          this.$router.push("/exhibition/temporary");
        }
      });
    },
    // 获取详情
    getDetails() {
      if (this.$route.query.id) {
        console.log(this.temporaryDetail);
        this.details = this.temporaryDetail;
      }
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
            daily_opening_time: this.form.time[0], // 每日开展时间
            daily_closing_time: this.form.time[1], // 每日开展时间
            temporary_exhibition_type_code: this.form.exhibitionItemType, // 临时展览类型
            ticket_information_code: "", // 票类支持编号
            number_reservations: this.form.number, // 总票数
            exhibition_address: this.form.address, // 展览地址
            organizer_information: this.form.organizers, // 举办方
            cover_img: this.form.imageUrl, // 封面图片
            activity_description: this.form.content, // 活动介绍
          };
          // 票类支持编号
          params.ticket_information_code = this.form.ticketTypes
            .map((el) => el.ticket_information_code)
            .join(",");
          // 票类支持数据
          params.listTicketInformationTable = this.form.ticketTypes;
          // 注意事项
          params = { ...params, ...this.form.considerations };
          if (this.isEdit) {
            params.temporary_exhibition_code = this.form.id;
          }
          console.log(params);
          this.addData(params);
        }
      });
    },

    /**
     * 监听时间选择
     * @param {Array} data 时间数组
     */
    handleOnchangeTimesSelect(data) {
      console.log(data);
      this.form.time = data;
    },
    /**
     * 监听获取票类支持
     * @param {Array} data 票类支持数组
     */
    handleOnchangeTicketType(data) {
      console.log(data);
      this.form.ticketTypes = data;
    },
    /**
     * 监听获取注意事项
     * @param {Object} data 注意事项对象
     */
    handleOnchangeConsiderations(data) {
      console.log(data);
      this.form.considerations = data;
    },
    /**
     * 监听获取图片组件传值
     * @param {String} data 图片字符串
     */
    handleOnchangeImage(data) {
      console.log(data);
      this.form.imageUrl = data;
    },
    /**
     * 监听获取富文本组件传值
     * @param {String} data 富文本字符串
     */
    handleOnchangeRichText(data) {
      console.log(data);
      this.form.content = data;
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
  .el-form-item__content {
    line-height: 44px;
  }
}
</style>
