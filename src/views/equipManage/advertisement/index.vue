<template>
  <div class="app-container">
    <div style="border-bottom: 1px solid #f5f5f5;padding: 20px 0;margin-bottom: 20px;">
      <!-- 按钮区域 -->
      <el-button type="primary" class="btn" size="small" @click="handleCreate()">添加Banner</el-button>
    </div>

    <el-table :data="list" fit highlight-current-row style="width: 100%;">
      <el-table-column label="图片" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片名称" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片描述" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="100" class-name="small-padding fixed-width">
        <template slot-scope="{ row, $index }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">查看</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row, $index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      v-show="total > 0"
      :total="total"
      :current.sync="listQuery.current"
      :size.sync="listQuery.size"
      @pagination="getList"
    />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

export default {
  name: "ComplexTable",
  components: { Pagination },
  filters: {},
  data() {
    return {
      tableKey: 0,
      total: 0,
      list: null,
      listLoading: true,
      listQuery: {
        current: 1,
        size: 20,
      },
      // 查询参数
      searchForm: {
        ticketName: "",
        openTime: "",
        saleStatus: "",
      },
      // 预售状态列表
      saleStatusList: [
        { value: "0", label: "全部" },
        { value: "1", label: "未开始" },
        { value: "2", label: "预约中" },
        { value: "3", label: "已结束" },
      ],
    };
  },
  created() {
    // this.getList();
  },
  methods: {
    /**
     * 功能函数 *
     */

    getList() {
      this.listLoading = true;
    },
    reset() {
      this.$nextTick(() => {
        this.$refs["searchFormRef"].clearValidate();
      });
    },
    handleCreate() {
      this.$router.push({ path: "/exhibition/createTemporary" });
    },
    handleUpdate(row) {},
    updateData() {},
    handleDelete(row, index) {
      this.$notify({
        title: "成功",
        message: "删除成功",
        type: "success",
        duration: 2000,
      });
      this.list.splice(index, 1);
    },
  },
};
</script>

<style lang="less" scope>
.app-container {
}
</style>
