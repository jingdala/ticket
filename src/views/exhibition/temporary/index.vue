<template>
  <div class="app-container">
    <el-form
      :inline="true"
      :model="searchForm"
      ref="searchForm"
      label-width="80px"
    >
      <div>
        <el-form-item label="展览票务" prop="ticketName">
          <el-input
            v-model="searchForm.ticketName"
            placeholder="请输入门票名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="开放时间" prop="openTime">
          <el-date-picker
            v-model="searchForm.openTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="预售状态" prop="saleStatus">
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
          <el-button class="btn" size="small" @click="reset">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="btn"
            size="small"
            @click="handleCreate()"
            >新增展览</el-button
          >
        </el-form-item>
      </div>
    </el-form>

    <el-table :data="list" fit highlight-current-row style="width: 100%;">
      <el-table-column label="序号" prop="id" align="center" width="80">
        <template slot-scope="{ row }">
          <span>{{ row.index }}</span>
        </template>
      </el-table-column>
      <el-table-column label="展览名称" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.temporary_exhibition_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总预售票量" min-width="100px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.number_reservations }}</span>
        </template>
      </el-table-column>
      <el-table-column label="已预约数量" min-width="100px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.number_appointments }}</span>
        </template>
      </el-table-column>
      <el-table-column label="剩余数量" min-width="100px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.number_reservations - row.number_appointments }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预售状态" min-width="100px" align="center">
        <template slot-scope="{ row }">
          <span>{{ getSaleStatusText(row.temporary_exhibition_status) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预约开启时间" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.appointment_opening_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="展览开放时间" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.temporary_opening_start_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.temporary_exhibition_creationTime }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        width="200"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)"
            >查看</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(row, $index)"
            >删除</el-button
          >
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
import * as API from "@/axios/api";

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
      // 预售状态列表 1 未开始  2 预约中  3 已结束
      saleStatusList: [
        { value: "0", label: "全部" },
        { value: "1", label: "未开始" },
        { value: "2", label: "预约中" },
        { value: "3", label: "已结束" },
      ],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /**
     * 获取数据 *
     */
    // 获取列表数据
    getList() {
      this.$myLoading();
      API.GetTemporaryExhibitionData().then((res) => {
        console.log(res);
        if (res.data.msg === "200") {
          let data = res.data.data.map((el, index) => {
            el.index = index + 1;
            return el;
          });
          this.list = data;
          // this.total = res.data.total;
        }
        this.$myLoading().close();
      });
    },
    /**
     * 功能函数 *
     */
    // 重置搜索
    reset() {
      this.$refs["searchForm"].resetFields();
    },
    // 创建展览
    handleCreate() {
      this.$router.push({ path: "/exhibition/createTemporary" });
    },
    // 查看/编辑 展览数据
    handleUpdate(row) {
      // 保存当前列临时展览详情数据
      this.$store.commit({
        type: "setTemporaryDetail",
        temporaryDetail: row,
      });
      // 跳转到编辑页面
      this.$router.push({
        path: "/exhibition/createTemporary",
        query: {
          id: row.temporary_exhibition_code,
        },
      });
    },
    // 获取销售状态
    getSaleStatusText(value) {
      let list = this.saleStatusList.filter((el) => el.value === value);
      if (list.length > 0) {
        return list[0].label;
      }
      return "";
    },
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
