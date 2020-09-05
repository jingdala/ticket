<template>
  <div class="app-container">
    <el-form
      :inline="true"
      :model="searchForm"
      ref="searchFormRef"
      label-width="80px"
    >
      <div>
        <el-form-item label="展览票务">
          <el-input
            v-model="searchForm.ticketName"
            placeholder="请输入门票名称或ID"
          ></el-input>
        </el-form-item>
        <el-form-item label="预约时间">
          <el-date-picker
            v-model="searchForm.openTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="预售状态">
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
          <el-button type="primary" class="btn" size="small" @click="getList()"
            >查询</el-button
          >
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
      <el-table-column label="预约单号" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="票务名称" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="展览类型" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预约票类" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系人" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="儿童数" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总数量" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column label="参观时间" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预约时间" min-width="150px">
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
import Pagination from "@/components/Pagination";

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
        { value: "0", label: "已出票" },
        { value: "1", label: "已使用" },
        { value: "2", label: "已过期" },
        { value: "3", label: "待取票" },
        { value: "4", label: "补票" },
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
    updateData() {},
  },
};
</script>

<style lang="less" scope>
.app-container {
}
</style>
