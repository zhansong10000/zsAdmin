<template>
  <div class="main-page">
    <div class="search_panel" ref="searchPanel">
      <div class="search_item">
        <div class="search_item_title" style="width:50px;">关键字：</div>
        <el-input v-model="searchModel.keyword" placeholder="客户名称/客户电话/订单号"></el-input>
      </div>
      <el-button
        type="primary"
        @click="search"
        :loading="loading"
        icon="el-icon-search"
        size="small"
      >搜索</el-button>
      <el-button type="info" @click="reset" icon="el-icon-refresh" size="small">重置</el-button>
    </div>

    <div class="zs-tab">
      <ul class="zs-tab-title">
        <li :class="{'zs-this': searchModel.orderStatus==''}" @click="selectOrderStatus('')">全部订单</li>
        <li :class="{'zs-this': searchModel.orderStatus=='0'}" @click="selectOrderStatus('0')">待付款</li>
        <li :class="{'zs-this': searchModel.orderStatus==1}" @click="selectOrderStatus(1)">待加工</li>
        <li :class="{'zs-this': searchModel.orderStatus==2}" @click="selectOrderStatus(2)">加工中</li>
        <li :class="{'zs-this': searchModel.orderStatus==9}" @click="selectOrderStatus(9)">已完成</li>
        <li :class="{'zs-this': searchModel.orderStatus==10}" @click="selectOrderStatus(10)">已取消</li>
      </ul>
    </div>
    <div class="search_list order_table">
      <el-table
        ref="searchTable"
        :data="dataList"
        v-loading="loading"
        style="width: 100%"
        :height="tableHeight-40"
        :span-method="arraySpanMethod"
      >
        <el-table-column label="订单详情" min-width="55%">
          <template slot-scope="scope">
            <table class="order-table-body">
              <tr>
                <td colspan="5" class="order_info_td">
                  <div class="order_info">
                    <a href="javascript:void(0);" @click="detail(scope.row)">
                      <span class="order_info_span">{{scope.row.confirmTime}}</span>
                      <span class="order_info_span">订单号：{{scope.row.orderSn}}</span>
                      <span class="order_info_span">数量：X{{scope.row.orderTotal}}</span>
                      <span
                        class="order_info_span"
                      >{{scope.row.shopName}} ({{scope.row.nickname}} {{scope.row.phone}})</span>
                    </a>
                  </div>
                </td>
              </tr>
              <tr class="order_detail_tr">
                <td width="55%">
                  <a href="javascript:void(0);" @click="detail(scope.row)">
                    <div class="good_type">
                      <span
                        v-if="scope.row.optometryTypeId"
                      >{{scope.row.optometryTypeId | formatOptometryTypeId}}</span>
                      <span
                        v-if="scope.row.orderServiceId"
                      >{{scope.row.orderServiceId | formatOrderServiceId}}</span>
                    </div>
                    <div class="good_info">
                      <span v-if="scope.row.brandName">{{scope.row.brandName}}</span>
                      <span v-if="scope.row.funcName">{{scope.row.funcName}}</span>
                      <span v-if="scope.row.goodsName">{{scope.row.goodsName}}</span>
                    </div>
                    <div class="good_extra">
                      <span v-if="scope.row.orderRemark">备注：{{scope.row.orderRemark}}</span>
                    </div>
                  </a>
                </td>
                <td width="15%" class="al_center">
                  {{scope.row.customerName}}
                  <br />
                  <span
                    v-if="scope.row.goodsName!=null && scope.row.goodsName!=''"
                  >{{scope.row.customerPhone}}</span>
                </td>
                <td width="12%" class="pay_info">
                  <p>订单总额：¥{{scope.row.orderAmount}}</p>
                  <template v-for="item in scope.row.payInfoList">
                    <p v-if="item.isPay==1">已付： ¥{{item.orderAmount}}</p>
                    <p v-if="item.isPay==0" style="color:red">已付： ¥{{item.orderAmount}}</p>
                  </template>
                  <p
                    v-if="scope.row.orderStatus!=0"
                    style="color:red"
                  >实付总额：¥{{scope.row.orderActualAmount}}</p>
                </td>
                <td width="8%" class="al_center">{{scope.row.orderStatus | formatOrderStatus}}</td>
                <td width="10%" class="al_center">
                  <template v-if="scope.row.orderStatus==0">
                    <el-button type="info" size="mini" icon="zs-icon zs-icon-chexiao">取消</el-button>
                  </template>
                  <template v-if="scope.row.orderStatus==10">
                    <el-button type="danger" size="mini" icon="zs-icon zs-icon-shanchu">删除</el-button>
                  </template>
                  <template v-if="scope.row.orderStatus==1">
                    <el-button type="primary" size="mini" icon="zs-icon zs-icon-xiangyou2">开始加工</el-button>
                    <br />
                    <el-button type="warning" size="mini" icon="zs-icon zs-icon-jiahao">追加费用</el-button>
                  </template>
                  <template v-if="scope.row.orderStatus==2">
                    <template v-if=" scope.row.optometryTypeId!=4">
                      <el-button type="warning" size="mini" icon="zs-icon zs-icon-fankui">验光数据</el-button>
                      <br />
                    </template>
                    <el-button
                      type="success"
                      size="mini"
                      icon="zs-icon zs-icon-yuanxingxuanzhong"
                    >加工完成</el-button>
                  </template>
                </td>
              </tr>
            </table>
          </template>
        </el-table-column>
        <el-table-column label="收货人" min-width="15%" header-align="center"></el-table-column>
        <el-table-column label="金额" min-width="12%" header-align="center"></el-table-column>
        <el-table-column label="状态" min-width="8%" header-align="center"></el-table-column>
        <el-table-column label="操作" min-width="10%" align="center"></el-table-column>
      </el-table>
    </div>
    <zs-pagination
      :currentPage="pageNum"
      :pageSize="pageSize"
      :total="totalCount"
      @pageChange="getDataList"
      ref="pagination"
    ></zs-pagination>
    <order-detail ref="detailDialog"></order-detail>
  </div>
</template>
<script>
import Vue from "vue";
import mixins from "@/mixins";
import { pageNo, pageRow, emptyText, loadingText } from "@/utils/constant";
import { deepClone } from "@/utils";
import dicts from "@/utils/dicts";
import orderDetail from "./orderDetail";
export default {
  name: "order",
  mixins: [mixins],
  components: {
    orderDetail
  },
  data() {
    return {
      searchModel: {
        keyword: "",
        orderStatus: ""
      },
      searchParams: {
        keyword: "",
        orderStatus: ""
      },
      loading: false,
      pageNum: 1,
      pageSize: pageRow,
      totalCount: 0,
      dataList: []
    };
  },
  mounted() {
    this.getDataList();
    this.$nextTick(() => {});
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0) {
        return [1, 5];
      }
    },
    search() {
      let vm = this;
      vm.searchParams = deepClone(vm.searchModel);
      vm.$nextTick(() => {
        vm.getDataList();
      });
    },
    selectOrderStatus(val) {
      this.searchModel.orderStatus = val;
      this.search();
    },
    getDataList(pageNum = pageNo, pageSize = pageRow) {
      let vm = this;
      vm.tableScollToTop();
      vm.loading = true;
      vm.pageNum = pageNum;
      vm.pageSize = pageSize;
      vm.$http({
        method: "post",
        url: "/order/list",
        params: {
          orderStatus: vm.searchParams.orderStatus,
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

    detail(row) {
      let detailDialog = this.$refs.detailDialog;
      detailDialog.detail(row);
    }
  },
  computed: {}
};
</script>
<style lang="scss" scoped>
.order_table .el-table .cell {
  padding: 0 !important;
}
.search_list {
  .order-table-body {
    width: calc(100% + 20px);
    margin: 0 -10px;
    border-collapse: collapse;
    border-spacing: 0;
    background-color: #fff;
    tr {
      transition: all 0.3s;
      -webkit-transition: all 0.3s;
      &:hover {
        background-color: #f5f5f5;
      }
      td {
        word-break: break-all;
        padding: 0 !important;
        border: 1px solid #e2e2e2 !important;
        font-size: 12px;
      }
      .order_info_td {
        .order_info {
          line-height: 30px;
          height: 30px;
          font-size: 12px;

          background-color: #e5e5e5;
          .order_info_span {
            margin: 0 20px 0 10px;
          }
        }
      }

      .al_center {
        text-align: center;
      }
    }
    .order_detail_tr {
      td {
        padding: 9px 10px !important;
        color: #333;
        .good_type {
          span {
            &:before {
              content: "【";
            }
            &:after {
              content: "】";
            }
          }
        }
        .good_info {
          span {
            &:after {
              content: "/ ";
            }
          }
          :last-child {
            &:after {
              content: "";
            }
          }
        }
      }
      .pay_info {
        p {
          font-size: 12px;
          font-weight: 500;
          line-height: 18px;
          height: 18px;
        }
      }
    }
  }
}

.zs-tab {
  margin: 0;
  text-align: left !important;
  overflow: hidden;
}

.zs-tab-title {
  .zs-this {
    color: #000;
    background-color: #f6f6f6;

    &:after {
      width: 100%;
      border: none;
      height: 2px;
      background-color: #e52d11;
    }

    &:hover {
      background-color: #f6f6f6;
      &:after {
        width: 100%;
      }
    }
  }

  li {
    &:hover {
      background-color: #f6f6f6;
      &:after {
        width: 100%;
      }
    }

    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      border-radius: 0;
      background-color: #e52d11;
      transition: all 0.3s;
      -webkit-transition: all 0.3s;
    }
  }
}

.zs-tab {
  text-align: left !important;
}

.zs-tab-title {
  position: relative;
  height: 36px;
  border: none;
  white-space: nowrap;
  li {
    display: inline-block;
    vertical-align: middle;
    font-size: 13px;
    transition: all 0.2s;
    -webkit-transition: all 0.2s;
    position: relative;
    line-height: 36px;
    min-width: 65px;
    text-align: center;
    cursor: pointer;
  }
}

.order_table .el-button--mini,
.el-button--mini.is-round {
  padding: 4px 5px;
}
</style>
