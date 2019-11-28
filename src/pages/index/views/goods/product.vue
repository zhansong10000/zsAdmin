<template>
  <div class="main-page">
    <div class="search_panel" ref="searchPanel">
      <div class="search_item">
        <div class="search_item_title" style="width:50px;">关键字：</div>
        <el-input v-model="searchModel.keyword" placeholder="产品类型名称"></el-input>
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
        <el-table-column prop="name" label="供应商名称" min-width="15%"></el-table-column>
        <el-table-column prop="phone" label="联系电话" min-width="10%" align="center"></el-table-column>
        <el-table-column prop="nickname" label="联系地址" min-width="35%" header-align="center"></el-table-column>
        <el-table-column prop="remark" label="备注信息" min-width="30%" header-align="center"></el-table-column>
        <el-table-column label="操作" min-width="10%" align="center">
          <template slot-scope="scope">
            <a href="javascript:void(0);" @click="edit(scope.row)" title="编辑">
              <i class="zs-icon zs-icon-bianji"></i>
            </a>
            <a href="javascript:void(0);" @click="del(scope.row)" title="删除">
              <i class="zs-icon zs-icon-shanchu"></i>
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
    <zs-dialog
      :showDialog="showAddDialog"
      @close="showAddDialog = false"
      :title="addTitle"
      width="450"
      height="330"
    >
      <template slot="content">
        <el-form ref="form" :model="modelForm" :rules="rules" label-width="90px">
          <el-form-item label="供应商名称" prop="name">
            <el-input v-model="modelForm.name"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="modelForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="联系地址">
            <el-input v-model="modelForm.remark"></el-input>
          </el-form-item>
          <el-form-item label="备注信息">
            <el-input v-model="modelForm.remark"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template slot="button">
        <el-button type="primary" size="small" @click="save">保存</el-button>
        <el-button size="small" @click="showAddDialog = false">关闭</el-button>
      </template>
    </zs-dialog>
  </div>
</template>
<script>
import Vue from "vue";
import mixins from "@/mixins";
import { pageNo, pageRow, emptyText, loadingText } from "@/utils/constant";
import { deepClone } from "@/utils";
export default {
  name: "product",
  mixins: [mixins],
  data() {
    return {
      searchModel: {
        keyword: ""
      },
      searchParams: {
        keyword: ""
      },
      loading: false,
      pageNum: 1,
      pageSize: pageRow,
      totalCount: 0,
      dataList: [],
      showAddDialog: false,
      addTitle: "",
      modelForm: {
        id: "",
        nickname: "",
        name: "",
        phone: "",
        remark: ""
      },
      rules: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        phone: [{ required: true, message: "不能为空", trigger: "blur" }]
      }
    };
  },
  mounted() {
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
        url: "/wxUser/list",
        params: {
          keyword: vm.searchParams.keyword,
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
    reset() {
      for (let key in this.searchModel) {
        this.searchModel[key] = "";
      }
      this.search();
    },
    add() {
      for (let key in this.modelForm) {
        this.modelForm[key] = "";
      }
      this.addTitle = "新增供应商信息";
      this.showAddDialog = true;
    },
    edit(row) {
      for (let key in this.modelForm) {
        this.modelForm[key] = row[key];
      }
      this.addTitle = "编辑供应商信息";
      this.showAddDialog = true;
    },
    del(row) {},
    save() {
      let vm = this;
      vm.$refs.form.validate(valid => {
        if (valid) {
          vm.$http({
            method: "post",
            url: "/wxUser/update",
            params: vm.modelForm
          })
            .then(result => {
              if (result.code == 0) {
                vm.$success("保存成功");
                this.showAddDialog = false;
                vm.getDataList(vm.pageNum, vm.pageSize);
              } else {
                vm.$error("保存失败");
              }
            })
            .catch(error => {});
        }
      });
    }
  }
};
</script>
<style>
</style>
