<template>
  <div class="conventional_content">
    <el-calendar>
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template slot="dateCell" slot-scope="{date, data}">
        <div style="position: relative;">
          <div>{{ data.day.split('-').slice(1).join('-') }}</div>
          <div v-if="setShowContent(date, data) === 1">
            <div style="font-size: 24px;">闭馆</div>
          </div>
          <div v-if="setShowContent(date, data) === 2">
            <div>预约票数{{getAppointmentNumber(date, data)}}</div>
            <div>余票{{getStandbyNumber(date, data)}}</div>
          </div>
          <div
            v-if="isFormerly(date, data)"
            style="position:absolute;top:0;left:0;width:100%;height: 100%;z-index: 10;cursor:not-allowed ; "
          ></div>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
import EditBasic from "./EditBasic";
import EditTicketType from "./EditTicketType";

export default {
  name: "ConventionalHeader",
  components: { EditBasic, EditTicketType },
  filters: {},
  data() {
    return {};
  },
  created() {},
  methods: {
    /**
     * 功能函数 *
     */
    /**
     * 判断显示内容
     * @return {Number} 类型定义 1：闭馆； 2：预约票； 3：编辑状态，待开馆； 4：编辑状态：待闭馆
     */
    setShowContent(date, data) {
      return 1;
    },
    // 获取预约数
    getAppointmentNumber(date, data) {
      console.log(date);
      console.log(data);
    },
    // 获取余票数
    getStandbyNumber(date, data) {
      console.log(date);
      console.log(data);
    },
    // 是否为今天前
    isFormerly(date, data) {
      let current = date.getTime();
      let today = new Date().getTime() - 24 * 3600 * 1000;
      return current < today;
    },
  },
};
</script>
<style lang="less">
.conventional_header {
  .close {
    font-size: 30px;
    cursor: not-allowed;
  }
}
</style>
