<template>
  <div>
    <zs-dialog
      :showDialog="showAddDialog"
      @close="showAddDialog = false"
      title="订单详情"
      width="750"
      height="480"
    >
      <template slot="content">
        <div class="order_detail">
          <i
            class="zs-icon zs-icon-dingdan"
            style="font-size:24px;margin-right:10px;color: #a7a7a7;"
          ></i>
          <div class="order_info">
            <span>订单编号：{{modelForm.orderSn}}</span>
            <span>订单状态：{{modelForm.orderStatus | formatOrderStatus}}</span>
            <span>下单时间：{{modelForm.confirmTime}}</span>
            <span>加工时间：</span>
          </div>
          <i
            class="zs-icon zs-icon-zuobiao"
            style="font-size:24px;margin-right:10px;color: #a7a7a7;"
          ></i>
          <div class="order_info">
            <span>商铺名称：{{modelForm.shopName}}</span>
            <span>顾客名称：{{modelForm.customerName}}</span>
          </div>
        </div>
        <div class="order_title">验光数据</div>
        <div class="order_body">
          <span>普通验光</span>
          <span>￥20</span>
        </div>
        <div class="order_body">
          <table class="optometry">
            <tbody>
              <tr>
                <td></td>
                <td>度数</td>
                <td>散光</td>
                <td>轴位</td>
              </tr>
              <tr>
                <td>右眼</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>左眼</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>瞳距</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>瞳高</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>ADD</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="order_title">镜片</div>
      </template>
    </zs-dialog>
  </div>
</template>
<script>
import Vue from "vue";
import { deepClone } from "@/utils";
import dicts from "@/utils/dicts";
export default {
  name: "orderDetail",
  data() {
    return {
      showAddDialog: false,
      modelForm: {
        brandId: "",
        brandName: "",
        completeTime: "",
        confirmTime: "",
        customerName: "",
        customerPhone: "",
        expressAddress: "",
        expressAmount: "",
        funcId: "",
        funcName: "",
        goodsId: "",
        goodsName: "",
        isExpress: "",
        machId: "",
        name: "",
        nickname: "",
        optometryId: "",
        optometryTypeId: "",
        orderActualAmount: "",
        orderAmount: "",
        orderId: "",
        orderRemark: "",
        orderServiceId: "",
        orderSn: "",
        orderStatus: "",
        orderTotal: "",
        payInfoList: [],
        payLastTime: "",
        payStatus: "",
        pendingPayAmount: "",
        phone: "",
        shopName: ""
      }
    };
  },
  mounted() {
    this.$nextTick(() => {});
  },
  methods: {
    detail(row) {
      for (let key in this.modelForm) {
        this.modelForm[key] = row[key];
      }
      this.showAddDialog = true;
    }
  },
  computed: {}
};
</script>
<style lang="scss" scoped>
.order_detail {
  margin: 10px;
  padding: 0 10px;
  font-size: 12px;
  color: #333;
  display: flex;
  align-items: flex-start;
  .order_info {
    width: 50%;
    span {
      display: block;
      line-height: 24px;
    }
  }
}
.order_title {
  margin: 0 20px;
  font-size: 12px;
  line-height: 30px;
  font-weight: 600;
  color: #181818;
  border-bottom: 1px solid #ececec;
}
.order_body {
  display: flex;
  margin: 0 20px;
  font-size: 12px;
  justify-content: space-between;
  margin-bottom: 8px;
}
.optometry {
  tr {
    td {
      font-size: 11px;
      padding: 6px 30px 6px 0;
    }
  }
}
</style>
