<template>
  <div class="app-container">
    <el-form :inline="true" :model="searchForm" ref="searchFormRef" label-width="80px">
      <div>
        <el-form-item label="关键字">
          <el-input v-model="searchForm.ticketName" placeholder="请输入用户昵称"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.saleStatus" placeholder="请选择">
            <el-option
              v-for="item in saleStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div style="text-align: right;">
        <!-- 按钮区域 -->
        <el-form-item>
          <el-button type="primary" class="btn" size="small" @click="getList()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" size="small" @click="reset()">重置</el-button>
        </el-form-item>
      </div>
    </el-form>

    <el-table :data="list" fit highlight-current-row style="width: 100%;">
      <el-table-column label="序号" prop="id" align="center" width="80">
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="头像" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号码" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="累计预约次数" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="累计预约张数" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户来源" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="100" class-name="small-padding fixed-width">
        <template slot-scope="{ row, $index }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">详情</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row, $index)">禁用</el-button>
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
import Pagination from "@/componentsCommon/Pagination"; // secondary package based on el-pagination

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
      // 状态
      saleStatusList: [
        { value: "0", label: "启用" },
        { value: "1", label: "禁用" },
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
