<template>
  <div class="app-container">
    <div style="padding: 20px 0; margin-bottom: 20px;border-bottom: 1px solid #f5f5f5;">
      <!-- 按钮区域 -->
      <el-button type="primary" class="btn" size="small" @click="handleAddRole">+ 新增角色</el-button>
      <el-button type="primary" class="btn" size="small" @click="handleAddSystemAccount">+ 新增系统人员</el-button>
    </div>

    <el-table :data="list" fit highlight-current-row style="width: 100%;">
      <el-table-column label="序号" prop="id" align="center" width="80">
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色名称" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="编码" min-width="150px">
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
          <el-button size="mini" @click="handleUpdate(row)">编辑权限</el-button>
          <el-button size="mini" @click="handleUpdate(row)">编辑</el-button>
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
    <AddRole ref="addRole"></AddRole>
    <AddSystemAccount ref="addSystemAccount"></AddSystemAccount>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import AddRole from "./component/AddRole";
import AddSystemAccount from "./component/AddSystemAccount";

export default {
  name: "ComplexTable",
  components: { Pagination, AddRole, AddSystemAccount },
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
    handleAddRole() {
      this.$refs.addRole.handleDialogVisible();
    },
    handleAddSystemAccount() {
      this.$refs.addSystemAccount.handleDialogVisible();
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
