<template>
  <div class="conventional_header">
    <div class="header_box">
      <div class="left">
        <!-- 基础信息 -->
        <div class="basic_data">
          <div class="basic_item" v-for="(item, index) in basicData" :key="index">
            <span class="label">{{ item.label }}：</span>
            <span class="value">{{ item.value }}</span>
          </div>
          <div v-if="isEdit">
            <el-button @click="handleEditBasic">编辑基础信息</el-button>
          </div>
        </div>
        <div class="ticket_type">
          <span class="title">票类支持：</span>
          <TicketTypeListForm :onchange="handleOnchange" :isEdit="isEdit"></TicketTypeListForm>
        </div>
      </div>
      <div class="right">
        <!-- 编辑相关按钮 -->
        <el-button type="primary" @click="setIsEdit(true)" v-if="!isEdit">编辑</el-button>
        <el-button v-if="isEdit" @click="setIsEdit(false)">退出</el-button>
        <el-button type="primary" v-if="isEdit" @click="handleBatchOpen">批量开馆</el-button>
      </div>
    </div>
    <!-- 弹框 -->
    <editBasic ref="editBasic"></editBasic>
    <EditBatchOpen ref="editBatchOpen"></EditBatchOpen>
  </div>
</template>

<script>
import EditBasic from "./EditBasic";
import EditBatchOpen from "./EditBatchOpen";
import TicketTypeListForm from "@/components/Form/TicketTypeListForm";
import { mapState } from "vuex";

export default {
  name: "ConventionalHeader",
  components: { EditBasic, EditBatchOpen, TicketTypeListForm },
  filters: {},
  data() {
    return {
      // 基础信息
      basicData: [
        { label: "名称", value: "暂无" },
        { label: "地点", value: "暂无" },
        { label: "举办方", value: "暂无" },
      ],
    };
  },
  computed: {
    ...mapState({
      isEdit: (state) => state.exhibition.isEdit,
    }),
  },
  methods: {
    /**
     * 功能函数 *
     */
    /**
     * 设置编辑
     * @param {boolean} 是否为编辑状态
     */
    setIsEdit(isEdit) {
      this.setEditState(isEdit);
    },
    // 点击编辑基础信息
    handleEditBasic() {
      this.$refs.editBasic.handleDialogVisible();
    },

    // 点击编辑票类支持
    handleOnchange(data) {
      console.log(data);
    },

    // 设置编辑状态
    setEditState(isEdit) {
      this.$store.commit({
        type: "setIsEdit",
        isEdit,
      });
    },
    // 点击批量开馆
    handleBatchOpen() {
      this.$refs.editBatchOpen.handleDialogVisible();
    },
  },
};
</script>
<style lang="less" scope>
.conventional_header {
  .header_box {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    .left {
      display: flex;
      .basic_data {
        display: flex;
        flex-wrap: wrap;
        margin-right: 20px;
        .basic_item {
          margin-right: 20px;
          .label {
            color: #888;
          }
          .value {
            color: #333;
          }
        }
      }
      .ticket_type {
        display: flex;
        flex-wrap: wrap;
        .title {
          color: #888;
        }
        > div {
          display: flex;
        }
      }
    }
  }
}
</style>
