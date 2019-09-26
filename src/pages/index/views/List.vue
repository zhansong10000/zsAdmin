<template>
  <div class="main-page">
    <div class="search_panel" ref="searchPanel">
      <div class="search_item">
        <div class="search_item_title">姓名：</div>
        <el-input v-model="searchModel.name"></el-input>
      </div>
      <div class="search_item">
        <div class="search_item_title">所属机构：</div>
        <el-input v-model="searchModel.org"></el-input>
      </div>
      <div class="search_item">
        <div class="search_item_title">所属机构：</div>
        <el-select placeholder="请选择" v-model="searchModel.orgCode">
          <el-option v-for="item in [1,2,3]" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      <div class="search_item">
        <div class="search_item_title">所属机构：</div>
        <el-input v-model="searchModel.org"></el-input>
      </div>
      <div class="search_item">
        <div class="search_item_title">所属机构：</div>
        <el-select placeholder="请选择" v-model="searchModel.orgCode">
          <el-option v-for="item in [1,2,3]" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      <div class="search_item">
        <div class="search_item_title">所属机构：</div>
        <el-input v-model="searchModel.org"></el-input>
      </div>
      <div class="search_item">
        <div class="search_item_title">所属机构：</div>
        <el-select placeholder="请选择" v-model="searchModel.orgCode">
          <el-option v-for="item in [1,2,3]" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      <el-button type="primary" @click="goA" icon="el-icon-search" size="small">搜索</el-button>
      <el-button type="info" @click="goB" icon="el-icon-refresh" size="small">重置</el-button>
      <el-button type="success" @click="go" icon="el-icon-circle-plus-outline" size="small">新增</el-button>
    </div>
    <div class="search_list">
      <el-table :data="tableData" style="width: 100%" :height="tableHeight" border>
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </div>
    <zs-pagination :total="100" ref="pagination"></zs-pagination>
  </div>
</template>
<script>
import Vue from "vue";
import mixins from "@/mixins";
import { pageNo, pageSize, emptyText, loadingText } from "@/utils/constant";
export default {
  name: "list",
  mixins: [mixins],
  data() {
    return {
      searchModel: {
        name: "",
        org: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    getDataList(pageNum = pageNo, pageRow = pageSize) {
      console.log("pageNo：" + pageNum + " -----pageSize：" + pageRow);
    },
    go() {
      this.$router.push({ path: "/aa?name=zhangsan" });
    },
    goA() {
      this.$router.push({ path: "/c?name=zhangsan" });
    },
    goB() {
      this.$router.push({ path: "/bb?name=zhangsan" });
    }
  }
};
</script>
<style>
</style>
