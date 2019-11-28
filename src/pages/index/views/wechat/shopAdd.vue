<template>
  <div>
    <zs-dialog
      :showDialog="showAddDialog"
      @close="showAddDialog = false"
      :title="addTitle"
      width="450"
      height="480"
    >
      <template slot="content">
        <el-form ref="form" :model="modelForm" :rules="rules" label-width="80px">
          <el-form-item label="商铺名称" prop="shopName">
            <el-input v-model="modelForm.shopName"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="shopPhone">
            <el-input v-model="modelForm.shopPhone"></el-input>
          </el-form-item>
          <el-form-item label="商铺类型" prop="shopType">
            <el-select v-model="modelForm.shopType" clearable>
              <el-option
                v-for="item in shopTypeList"
                :key="item.code"
                :label="item.desc"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="老板信息">
            <el-button
              type="primary"
              icon="el-icon-circle-plus"
              @click="showShopStaffListDialog(9,'设置老板')"
              size="mini"
            >设置老板</el-button>
            <div
              class="staff_content"
              v-if="modelForm.shopStaffList&&modelForm.shopStaffList.length>0"
            >
              <span
                class="staff_p"
                v-for="item in modelForm.shopStaffList"
                v-if="item.staffType==9"
              >{{item.nickname}}</span>
            </div>
          </el-form-item>
          <el-form-item label="员工信息">
            <el-button
              type="primary"
              icon="el-icon-circle-plus"
              @click="showShopStaffListDialog(0,'设置员工')"
              size="mini"
            >设置员工</el-button>
            <div
              class="staff_content"
              v-if="modelForm.shopStaffList&&modelForm.shopStaffList.length>0"
            >
              <span
                class="staff_p"
                v-for="item in modelForm.shopStaffList"
                v-if="item.staffType==0"
              >{{item.nickname}}</span>
            </div>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="modelForm.remark"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="isOpen">
            <el-switch v-model="modelForm.isOpen" active-value="1" inactive-value="0"></el-switch>
          </el-form-item>
        </el-form>
      </template>
      <template slot="button">
        <el-button type="primary" size="small" @click="save">保存</el-button>
        <el-button size="small" @click="showAddDialog = false">关闭</el-button>
      </template>
    </zs-dialog>

    <zs-dialog
      :showDialog="showSelectDialog"
      @close="showSelectDialog = false"
      :title="selectTitle"
      width="800"
      height="570"
    >
      <template slot="content">
        <div class="search_panel" ref="searchPanel">
          <div class="search_item">
            <div class="search_item_title" style="width:50px;">关键字：</div>
            <el-input v-model="searchModel.keyword" placeholder="微信名称/联系电话/备注"></el-input>
          </div>
          <el-button
            type="primary"
            @click="search"
            :loading="loading"
            icon="el-icon-search"
            size="small"
          >搜索</el-button>
          <el-button type="success" @click="saveSelect" icon="el-icon-setting" size="small">确认设置</el-button>
        </div>
        <div class="search_list" style="height:auto;">
          <el-table
            ref="selectTable"
            :data="dataList"
            v-loading="loading"
            @select="handleSelectChange"
            @select-all="handleSelectChange"
            style="width: 100%"
            height="380"
            border
            stripe
          >
            <el-table-column type="selection" min-width="5%"></el-table-column>
            <el-table-column prop="nickname" label="微信名称" min-width="25%" header-align="center"></el-table-column>
            <el-table-column prop="name" label="姓名" min-width="25%" header-align="center"></el-table-column>
            <el-table-column prop="phone" label="联系电话" min-width="20%" header-align="center"></el-table-column>
            <el-table-column prop="remark" label="备注信息" min-width="25%" header-align="center"></el-table-column>
          </el-table>
          <zs-pagination
            :currentPage="pageNum"
            :pageSize="pageSize"
            :total="totalCount"
            @pageChange="getDataList"
            ref="pagination"
          ></zs-pagination>
        </div>
      </template>
    </zs-dialog>
  </div>
</template>
<script>
import Vue from "vue";
import { pageNo, pageRow, emptyText, loadingText } from "@/utils/constant";
import { deepClone } from "@/utils";
import dicts from "@/utils/dicts";
export default {
  name: "shopAdd",
  data() {
    return {
      showAddDialog: false,
      addTitle: "",
      shopTypeList: dicts.dictionary["shop_type"],
      modelForm: {
        id: "",
        shopId: "",
        shopName: "",
        shopPhone: "",
        shopType: "",
        shopStaffList: [],
        remark: "",
        isOpen: ""
      },
      rules: {
        shopName: [{ required: true, message: "不能为空", trigger: "blur" }],
        shopPhone: [{ required: true, message: "不能为空", trigger: "blur" }],
        shopType: [{ required: true, message: "不能为空", trigger: "change" }]
      },
      showSelectDialog: false,
      selectTitle: "",
      selectList: [],
      loading: false,
      searchModel: {
        keyword: "",
        shopId: "",
        staffType: ""
      },
      searchParams: {
        keyword: "",
        shopId: "",
        staffType: ""
      },
      pageNum: 1,
      pageSize: pageRow,
      totalCount: 0,
      dataList: []
    };
  },
  mounted() {},
  methods: {
    add() {
      for (let key in this.modelForm) {
        this.modelForm[key] = "";
      }
      this.modelForm.shopStaffList = [];
      this.addTitle = "新增商铺信息";
      this.showAddDialog = true;
    },
    edit(row) {
      for (let key in this.modelForm) {
        this.modelForm[key] = row[key];
      }
      this.modelForm.isOpen = row.isOpen + "";
      this.addTitle = "编辑商铺信息";
      this.showAddDialog = true;
    },
    save() {
      let vm = this;
      vm.$refs.form.validate(valid => {
        if (valid) {
          vm.$http({
            method: "post",
            url: "/shop/update",
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
    },
    showShopStaffListDialog(type, title) {
      this.selectTitle = title;
      this.showSelectDialog = true;
      for (let item of this.modelForm.shopStaffList) {
        if (item.staffType == type) {
          this.selectList.push(item);
        }
      }
      this.searchModel.shopId = this.modelForm.shopId;
      this.searchModel.staffType = type;
      this.search();
    },
    search() {
      let vm = this;
      vm.dataList = [];
      vm.searchParams = deepClone(vm.searchModel);
      vm.$nextTick(() => {
        vm.getDataList();
      });
    },
    getDataList(pageNum = pageNo, pageSize = pageRow) {
      let vm = this;
      vm.loading = true;
      vm.pageNum = pageNum;
      vm.pageSize = pageSize;
      vm.$http({
        method: "post",
        url: "/shop/wxUserSelect/list",
        params: {
          keyword: vm.searchParams.keyword,
          shopId: vm.searchParams.shopId,
          staffType: vm.searchParams.staffType,
          pageNum: pageNum,
          pageSize: pageSize
        }
      })
        .then(result => {
          vm.loading = false;
          if (result.code == 0) {
            vm.dataList = result.data.dataList;
            vm.totalCount = result.data.totalCount;
            vm.setSelect();
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
    },
    setSelect() {
      let vm = this;
      let selectIdsStr = vm.getListOpenIds(vm.selectList);
      vm.$nextTick(() => {
        vm.dataList.forEach(row => {
          if (selectIdsStr.indexOf(row.openid) >= 0) {
            vm.$refs.selectTable.toggleRowSelection(row, true);
          }
        });
      });
    },
    handleSelectChange(list, row) {
      let vm = this;
      if (row) {
        if (vm.isExistInList(list, row)) {
          vm.selectList.push(row);
        } else {
          vm.removeItemFromList(vm.selectList, row);
        }
      } else {
        let selectIdsStr = vm.getListOpenIds(vm.selectList);
        if (list.length == 0) {
          vm.dataList.forEach(row => {
            if (selectIdsStr.indexOf(row.openid) >= 0) {
              vm.removeItemFromList(vm.selectList, row);
            }
          });
        } else {
          vm.dataList.forEach(row => {
            if (selectIdsStr.indexOf(row.openid) < 0) {
              vm.selectList.push(row);
            }
          });
        }
      }
    },
    removeItemFromList(dataList, row) {
      for (let i = dataList.length - 1; i >= 0; i--) {
        let item = dataList[i];
        if (item.openid == row.openid) {
          dataList.splice(i, 1);
          break;
        }
      }
    },
    isExistInList(dataList, row) {
      let flag = false;
      let openidsStr = this.getListOpenIds(dataList);
      if (openidsStr.indexOf(row.openid) >= 0) {
        flag = true;
      }
      return flag;
    },
    getListOpenIds(dataList) {
      let ids = [];
      for (let item of dataList) {
        ids.push(item.openid);
      }
      return ids.join(",");
    },
    saveSelect() {
      let vm = this;
      let type = vm.searchModel.staffType;
      if (vm.modelForm.shopStaffList.length > 0) {
        for (let i = vm.modelForm.shopStaffList.length - 1; i >= 0; i--) {
          let item = vm.modelForm.shopStaffList[i];
          if (item.type == type) {
            vm.modelForm.shopStaffList.splice(i, 1);
          }
        }
      }
      vm.selectList.forEach(item => {
        item.staffType = type;
        vm.modelForm.shopStaffList.push(item);
      });
      vm.selectList = [];
      vm.reset();
      vm.showSelectDialog = false;
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