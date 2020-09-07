<template>
  <div class="ticket_type_list">
    <div v-if="!isEdit">
      <div
        class="ticket_item"
        v-for="(item, index) in ticketTypes"
        :key="index"
      >
        <span class="value">
          {{ item.name }}（票价￥ <b>{{ item.price }}</b
          >，开放票数 <b>{{ item.number }}</b
          >，类型 <b>{{ item.type }}</b
          >）
        </span>
      </div>
      <div v-if="ticketTypes.length === 0">暂无</div>
    </div>
    <div v-if="isEdit">
      <div
        class="ticket_edit"
        v-for="(item, index) in ticketTypes"
        :key="index"
      >
        <el-button type="text" @click="handleEditTicketType(item)"
          >编辑{{ item.name }}</el-button
        >
        <i class="el-icon-delete" @click="handleRemoveTicketType(index)"></i>
      </div>
      <div>
        <el-button @click="handleAddTicketType">新增</el-button>
      </div>
    </div>

    <!-- 弹框 -->
    <EditTicketType
      ref="editTicketType"
      :onchange="handleOnchane"
    ></EditTicketType>
  </div>
</template>

<script>
import EditTicketType from "./EditTicketType";
import { mapState } from "vuex";

export default {
  name: "TicketTypeListForm",
  props: {
    onchange: {
      type: Function,
    },
    propsValue: {
      type: Array,
    },
    // 是否为编辑模式
    isEdit: {
      type: Boolean,
    },
  },
  components: { EditTicketType },
  data() {
    return {
      // 票务类型
      ticketTypes: [
        // { id: 0, name: "团队票", type: "团队", price: 0, number: 0 },
      ],
    };
  },
  computed: {},
  watch: {
    // 监听父组件的传值
    propsValue: {
      immediate: true,
      handler(newValue, oldValue) {
        console.log(newValue);
        console.log(oldValue);
        if (newValue === oldValue || !newValue) {
          return;
        }
        console.log(newValue);
        this.ticketTypes = newValue.map((el) => {
          return {
            id: el.ticket_information_code,
            name: el.ticket_information_name,
            type: el.ticket_type_code,
            price: el.ticket_information_money,
            number: el.number_child_tickets_open,
          };
        });
      },
    },
    // 深度监听数组类型的值变化
    ticketTypes: {
      deep: true,
      handler(newValue, oldValue) {
        this.onchange(newValue);
        let data = newValue.map((el) => {
          return {
            ticket_information_code: el.id, // 票类支持id
            ticket_information_name: el.name, // 票类支持名称
            ticket_type_code: el.type, // 票类型
            ticket_information_money: el.price, // 票价
            number_child_tickets_open: el.number, // 票数
          };
        });
        this.onchange(data);
      },
    },
  },
  methods: {
    /**
     * 请求函数 *
     */
    /**
     * 删除票类型数据
     * @params {string} id 票类支持id
     * @params {string} fn 回调函数
     */
    deleteTicketTypeItem(id, fn) {
      let params = { ticketInformationCode: id };
      API.DeleteTicketInformationTable(params).then((res) => {
        if (res.data.msg === "200") {
          fn && fn();
        }
      });
    },
    /**
     * 功能函数 *
     */
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
      this.$confirm("此操作将删除该票类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.ticketTypes[index].id) {
            this.deleteTicketTypeItem(this.ticketTypes[index].id, function() {
              this.ticketTypes.splice(index, 1);
              this.$message.success("删除成功!");
            });
          } else {
            this.ticketTypes.splice(index, 1);
            this.$message.success("删除成功!");
          }
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    // 监听票类支持弹框返回的数据
    handleOnchane(item) {
      let list = this.ticketTypes.filter((el) => el.id !== item.id);
      list.push(item);
      this.ticketTypes = list;
      this.onchange(this.ticketTypes);
    },
  },
};
</script>
<style lang="less" scope>
.ticket_type_list {
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
</style>
