<template>
  <div class="main-page">
    <div class="search_panel" ref="searchPanel">
      <div class="search_item">
        <div class="search_item_title" style="width:50px;">关键字：</div>
        <el-input v-model="searchModel.keyword" placeholder="店铺名称/联系电话/备注"></el-input>
      </div>
      <div class="search_item">
        <div class="search_item_title">商户类型：</div>
        <el-select v-model="searchModel.shopType" filterable clearable>
          <el-option
            v-for="item in shopTypeList"
            :key="item.code"
            :label="item.desc"
            :value="item.code"
          ></el-option>
        </el-select>
      </div>
      <el-button
        type="primary"
        @click="search"
        :loading="loading"
        icon="el-icon-search"
        size="small"
      >搜索</el-button>
      <el-button type="info" @click="reset" icon="el-icon-refresh" size="small">重置</el-button>
      <el-button type="success" @click="add" icon="el-icon-circle-plus-outline" size="small">新增</el-button>
    </div>
    <div class="search_list">
      <el-table
        ref="searchTable"
        :data="dataList"
        v-loading="loading"
        style="width: 100%"
        :height="tableHeight"
        border
        stripe
      >
        <el-table-column prop="shopName" label="店铺名称" min-width="15%"></el-table-column>
        <el-table-column
          prop="shopType"
          label="商户类型"
          min-width="10%"
          align="center"
          :formatter="formatterShopType"
        ></el-table-column>
        <el-table-column label="老板" min-width="20%" header-align="center">
          <template slot-scope="scope">
            <div
              class="staff_content"
              v-if="scope.row.shopStaffList&&scope.row.shopStaffList.length>0"
            >
              <span
                class="staff_p"
                v-for="item in scope.row.shopStaffList"
                v-if="item.staffType==9"
              >{{item.nickname}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="工作人员" min-width="20%" header-align="center">
          <template slot-scope="scope">
            <div
              class="staff_content"
              v-if="scope.row.shopStaffList&&scope.row.shopStaffList.length>0"
            >
              <span
                class="staff_p"
                v-for="item in scope.row.shopStaffList"
                v-if="item.staffType==0"
              >{{item.nickname}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注信息" min-width="20%" header-align="center"></el-table-column>
        <el-table-column
          prop="isOpen"
          label="状态"
          min-width="5%"
          align="center"
          :formatter="formatterOpen"
        ></el-table-column>
        <el-table-column label="操作" min-width="10%" align="center">
          <template slot-scope="scope">
            <a href="javascript:void(0);" @click="edit(scope.row)" title="编辑">
              <i class="zs-icon zs-icon-bianji"></i>
            </a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <zs-pagination
      :currentPage="pageNum"
      :pageSize="pageSize"
      :total="totalCount"
      @pageChange="getDataList"
      ref="pagination"
    ></zs-pagination>
    <shop-add ref="addDialog"></shop-add>
  </div>
</template>
<script>
import Vue from "vue";
import mixins from "@/mixins";
import { pageNo, pageRow, emptyText, loadingText } from "@/utils/constant";
import { deepClone } from "@/utils";
import dicts from "@/utils/dicts";
import shopAdd from "./shopAdd";
export default {
  name: "shop",
  mixins: [mixins],
  components: {
    shopAdd
  },
  data() {
    return {
      shopTypeList: [],
      searchModel: {
        keyword: "",
        shopType: ""
      },
      searchParams: {
        keyword: "",
        shopType: ""
      },
      loading: false,
      pageNum: 1,
      pageSize: pageRow,
      totalCount: 0,
      dataList: [],
      showEditDialog: false
    };
  },
  mounted() {
    this.shopTypeList = [{ desc: "全部", code: "" }].concat(
      dicts.dictionary["shop_type"]
    );
    this.getDataList();
  },
  methods: {
    search() {
      let vm = this;
      vm.searchParams = deepClone(vm.searchModel);
      vm.$nextTick(() => {
        vm.getDataList();
      });
    },
    getDataList(pageNum = pageNo, pageSize = pageRow) {
      let vm = this;
      vm.tableScollToTop();
      vm.loading = true;
      vm.pageNum = pageNum;
      vm.pageSize = pageSize;
      vm.$http({
        method: "post",
        url: "/shop/list",
        params: {
          keyword: vm.searchParams.keyword,
          shopType: vm.searchParams.shopType,
          pageNum: pageNum,
          pageSize: pageSize
        }
      })
        .then(result => {
          vm.loading = false;
          if (result.code == 0) {
            vm.dataList = result.data.dataList;
            vm.totalCount = result.data.totalCount;
          } else {
            vm.dataList = [];
            vm.totalCount = 0;
          }
        })
        .catch(error => {
          vm.loading = false;
        });
    },
    formatterShopType(row, column, value) {
      return dicts.getDictDesc("shop_type", value);
    },
    formatterOpen(row, column, value) {
      return value == "1" ? "开启" : "关闭";
    },
    reset() {
      for (let key in this.searchModel) {
        this.searchModel[key] = "";
      }
      this.search();
    },
    add() {
      let addDialog = this.$refs.addDialog;
      addDialog.add();
    },
    edit(row) {
      let addDialog = this.$refs.addDialog;
      addDialog.edit(row);
    }
  }
};
</script>
<style lang="scss" scoped>
.staff_content {
  line-height: 15px;
  .staff_p {
    line-height: 15px;
    height: 15px;
    font-size: 12px;
    margin-right: 10px;
    white-space: normal;
    &:after {
      content: ",";
    }
  }
  :last-child {
    &:after {
      content: " ";
    }
  }
}
</style>