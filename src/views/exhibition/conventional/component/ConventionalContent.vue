<template>
  <div class="conventional_content">
    <el-calendar>
      <template slot="dateCell" slot-scope="{ date, data }">
        <div style="position: relative;">
          <div>
            <span style="margin-right: 10px;">
              {{
                data.day
                  .split("-")
                  .slice(1)
                  .join("-")
              }}
            </span>
            <!-- 
              1、开馆按钮展示：闭馆状态；编辑状态
              2、闭馆保存按钮同时展示：开馆状态；编辑状态
             -->
            <el-button
              size="mini"
              v-if="getOpenState(date, data) === 1 && isEdit"
              @click="setOpenState(2)"
            >
              开馆
            </el-button>
            <el-button
              type="primary"
              size="mini"
              v-if="getOpenState(date, data) === 2 && isEdit"
              @click="setOpenState(1)"
            >
              闭馆
            </el-button>
            <el-button
              size="mini"
              v-if="getOpenState(date, data) === 2 && isEdit"
              >保存</el-button
            >
          </div>
          <!-- 
            此功能逻辑如下
            1、闭馆：闭馆状态；
            2、预约票：开馆状态；非编辑状态；
            3、票数编辑器：开馆状态，编辑状态
           -->
          <div v-if="getOpenState(date, data) === 1">
            <div style="font-size: 24px;">闭馆</div>
          </div>
          <div v-if="getOpenState(date, data) === 2 && !isEdit">
            <div>预约票数{{ getAppointmentNumber(date, data) }}</div>
            <div>余票{{ getStandbyNumber(date, data) }}</div>
          </div>
          <div v-if="getOpenState(date, data) === 2 && isEdit">
            <el-input-number
              v-model="number"
              :min="0"
              :max="1000"
              size="mini"
              style="width: 200px;margin-top:10px;"
            ></el-input-number>
          </div>
          <!-- 当时间为今天前，阻止点击操作日历 -->
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
import { mapState } from "vuex";

export default {
  name: "ConventionalHeader",
  components: { EditBasic, EditTicketType },
  filters: {},
  data() {
    return {
      OpenState: 1,
      ContentState: 1,
      number: 1000,
    };
  },
  created() {},
  computed: {
    ...mapState({
      isEdit: (state) => {
        return state.exhibition.isEdit;
      },
    }),
  },
  methods: {
    /**
     * 功能函数 *
     */
    setOpenState(num) {
      console.log(num);
      this.OpenState = num;
    },
    /**
     * 根据日期获取操作按钮
     * @return {Number} 类型定义 0: 都不显示, 1: 开馆, 2:闭馆,
     */
    getOpenState(date, data) {
      return this.OpenState;
    },
    /**
     * 根据日期获取显示内容
     * @return {Number} 类型定义  0: 都不显示, 1: 闭馆, 2: 预约票数, 3: 票数编辑器
     */
    getContentState(date, data) {
      return this.ContentState;
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
