<template>
  <div class="app-container">
    <el-form :inline="true" :model="searchForm" ref="searchFormRef" label-width="80px">
      <div>
        <el-form-item label="日志内容">
          <el-input v-model="searchForm.ticketName" placeholder="请输入门票名称或ID"></el-input>
        </el-form-item>
        <el-form-item label="操作人">
          <el-input v-model="searchForm.ticketName" placeholder="请输入门票名称或ID"></el-input>
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
      <el-table-column label="日志内容" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作类型" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
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
    reset() {
      this.$nextTick(() => {
        this.$refs["searchFormRef"].clearValidate();
      });
    },
  },
};
</script>

<style lang="less" scope>
.app-container {
}
</style>
