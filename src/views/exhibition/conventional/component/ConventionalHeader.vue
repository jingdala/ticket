<template>
  <div class="conventional_header">
    <div class="header_box">
      <div class="left">
        <!-- 基础信息 -->
        <div class="basic_data">
          <div class="basic_item" v-for="(item, index) in basicData" :key="index">
            <span class="label">{{item.label}}：</span>
            <span class="value">{{item.value}}</span>
          </div>
          <div>
            <el-button @click="handleEditBasic">编辑基础信息</el-button>
          </div>
        </div>
        <div class="ticket_type">
          <span class="title">票类支持：</span>
          <div v-if="!isEdit">
            <div class="ticket_item" v-for="(item, index) in ticketTypes" :key="index">
              <span class="value">
                {{item.title}}（票价￥
                <b>{{item.price}}</b>，开放票数
                <b>{{item.number}}</b>，类型
                <b>{{item.type}}</b>）
              </span>
            </div>
          </div>
          <div v-if="isEdit">
            <div class="ticket_edit" v-for="(item, index) in ticketTypes" :key="index">
              <el-button type="text" @click="handleEditTicketType(item)">编辑{{item.title}}</el-button>
              <i class="el-icon-delete" @click="handleRemoveTicketType(index)"></i>
            </div>
            <div>
              <el-button @click="handleAddTicketType">新增</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <!-- 编辑相关按钮 -->
        <el-button type="primary" @click="setIsEdit(true)" v-if="!isEdit">编辑</el-button>
        <el-button v-if="isEdit" @click="setIsEdit(false)">退出</el-button>
        <el-button type="primary" v-if="isEdit">批量开馆</el-button>
      </div>
    </div>
    <!-- 弹框 -->
    <editBasic ref="editBasic"></editBasic>
    <EditTicketType ref="editTicketType"></EditTicketType>
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
    return {
      // 是否处于编辑状态
      isEdit: false,
      // 基础信息
      basicData: [
        { label: "名称", value: "暂无" },
        { label: "地点", value: "暂无" },
        { label: "举办方", value: "暂无" },
      ],
      // 票务类型
      ticketTypes: [
        { id: 0, title: "团队票", type: "团队", price: 0, number: 0 },
        { id: 1, title: "个人票", type: "个人", price: 0, number: 0 },
      ],
    };
  },
  created() {},
  methods: {
    /**
     * 功能函数 *
     */
    /**
     * 设置编辑
     * @param {boolean} 是否为编辑状态
     */
    setIsEdit(isEdit) {
      this.isEdit = !this.isEdit;
    },
    // 点击编辑基础信息
    handleEditBasic() {
      this.$refs.editBasic.handleDialogVisible();
    },
    // 点击编辑票类
    handleEditTicketType(item) {
      this.$refs.editTicketType.handleDialogVisible(item);
    },
    // 点击新增票类
    handleAddTicketType() {
      if (this.ticketTypes.length === 2) {
        this.$message.warning("最多只有两个票类!");
        return;
      }
      this.$refs.editTicketType.handleDialogVisible();
    },
    // 点击删除票类
    handleRemoveTicketType(index) {
      this.form.otherList.splice(index, 1);
    },
    getList() {},
    reset() {},
  },
};
</script>
<style lang="less">
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
        .ticket_item {
          margin-right: 20px;
          .value {
            color: #333;
          }
        }
        .ticket_edit {
          cursor: pointer;
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
