<template>
  <div class="home-page">
    <div class="info_items">
      <div class="res_item">
        <div class="res_icon">
          <i class="zs-icon zs-icon-consumption" style="font-size:75px;"></i>
        </div>
        <div class="res_content">
          <div class="res_num">
            ¥88888.00
            <span class="res_unit">元</span>
          </div>
          <div class="res_title">今日销量总额</div>
        </div>
      </div>
      <div class="res_item">
        <div class="res_icon">
          <i class="zs-icon zs-icon-dingdan"></i>
        </div>
        <div class="res_content">
          <div class="res_num">
            200
            <span class="res_unit">笔</span>
          </div>
          <div class="res_title">今日订单总数</div>
        </div>
      </div>
      <div class="res_item">
        <div class="res_icon">
          <i class="zs-icon zs-icon-pengyou"></i>
        </div>
        <div class="res_content">
          <div class="res_num">
            187
            <span class="res_unit">人</span>
          </div>
          <div class="res_title">会员总数</div>
        </div>
      </div>
    </div>
    <div class="info_cards" :style="'height:'+(contentHeight-150)+'px'">
      <div class="info_card">
        <div class="card_head">
          <div class="card_title">订单统计</div>
          <span class="card_count">
            300
            <span class="card_unit">笔</span>
          </span>
        </div>
        <div class="card_body">
          <div class="card_item row_5">
            <div class="card_item_title">待付款</div>
            <span class="card_item_count">
              18
              <span class="card_item_unit">笔</span>
            </span>
          </div>
          <div class="card_item row_5">
            <div class="card_item_title">加工中/出库中</div>
            <span class="card_item_count">
              18
              <span class="card_item_unit">笔</span>
            </span>
          </div>
          <div class="card_item row_5">
            <div class="card_item_title">待加工/待出库</div>
            <span class="card_item_count">
              18
              <span class="card_item_unit">笔</span>
            </span>
          </div>
          <div class="card_item row_5">
            <div class="card_item_title">待配送</div>
            <span class="card_item_count">
              18
              <span class="card_item_unit">笔</span>
            </span>
          </div>
          <div class="card_item row_5">
            <div class="card_item_title">已完成</div>
            <span class="card_item_count">
              18
              <span class="card_item_unit">笔</span>
            </span>
          </div>
        </div>
      </div>
      <div class="info_card">
        <div class="card_head">
          <div class="card_title">今日商品</div>
          <span class="card_count">
            200
            <span class="card_unit">件</span>
          </span>
        </div>
        <div class="card_body">
          <div class="card_item row_4">
            <div class="card_item_title">眼镜片</div>
            <span class="card_item_count">
              18
              <span class="card_item_unit">件</span>
            </span>
          </div>
          <div class="card_item row_4">
            <div class="card_item_title">眼框</div>
            <span class="card_item_count">
              18
              <span class="card_item_unit">件</span>
            </span>
          </div>
          <div class="card_item row_4">
            <div class="card_item_title">太阳镜</div>
            <span class="card_item_count">
              18
              <span class="card_item_unit">件</span>
            </span>
          </div>
          <div class="card_item row_4">
            <div class="card_item_title">其他</div>
            <span class="card_item_count">
              18
              <span class="card_item_unit">件</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import mixins from "@/mixins";
import { deepClone } from "@/utils";
export default {
  name: "homepage",
  mixins: [mixins],
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style  lang="scss" scoped>
.home-page {
  background: #f2f6f8;
  height: 100%;
}
.info_items {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  align-items: center;
  width: 100%;
  .res_item {
    width: calc(33.33% - 20px);
    margin: 20px 10px;
    padding: 20px;
    height: 140px;
    background: #fff;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1), -1px 0 2px rgba(0, 0, 0, 0.05);
    align-self: center;
    position: relative;
    .res_icon {
      display: inline-block;
      width: 100px;
      height: 100px;
      .zs-icon {
        margin-left: 20px;
        line-height: 100px;
        font-size: 60px;
        color: #e2231a;
      }
    }
    .res_content {
      display: inline-block;
      position: absolute;
      left: 140px;
      height: 80px;
      line-height: 80px;
      top: 0;
      bottom: 0;
      margin: auto;
      .res_num {
        font-size: 30px;
        height: 40px;
        line-height: 40px;
        font-family: Arial;
        color: #e2231a;
        .res_unit {
          display: inline-block;
          font-size: 20px;
          margin-left: 10px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #676767;
        }
      }
      .res_title {
        font-size: 24px;
        height: 40px;
        line-height: 40px;
        font-family: PingFang SC;
        color: #676767;
      }
    }
  }
}
.info_cards {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  align-items: center;
  width: 100%;
  .info_card {
    width: calc(50% - 20px);
    height: 100%;
    margin: 0 10px;
    padding: 0;
    background-color: #fff;
    border: 0 solid #eee;
    border-radius: 0;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1), -1px 0 2px rgba(0, 0, 0, 0.05);
    .card_head {
      position: relative;
      height: 60px;
      line-height: 60px;
      box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.05);
      border-bottom: 1px solid #eee;
      font-family: PingFang SC;
      .card_title {
        font-weight: 600;
        padding-left: 20px;
        line-height: 20px;
        display: inline-block;
        &:before {
          content: "";
          vertical-align: middle;
          margin-right: 10px;
          display: inline-block;
          width: 4px;
          height: 20px;
          background: #e2231a;
        }
      }
      .card_count {
        position: absolute;
        color: #e2231a;
        right: 10px;
        .card_unit {
          font-size: 13px;
          margin-left: 5px;
          font-weight: 400;
          color: #676767;
        }
      }
    }
    .card_body {
      margin: 0 20px;
      padding: 0 20px;
      height: calc(100% - 60px);
      display: flex;
      flex-direction: column;
      .row_4 {
        height: 25%;
      }
      .row_5 {
        height: 20%;
      }
      .card_item {
        position: relative;
        border-bottom: 1px solid #eee;
        .card_item_title {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          height: 1px;
          line-height: 1px;
          margin: auto;
          display: inline-block;
        }
        .card_item_count {
          position: absolute;
          color: #e2231a;
          top: 0;
          bottom: 0;
          right: 0;
          height: 1px;
          line-height: 1px;
          margin: auto;
          .card_item_unit {
            font-size: 12px;
            margin-left: 5px;
            font-weight: 400;
            color: #676767;
          }
        }
        &:last-child {
          border: none;
        }
      }
    }
  }
}
</style>
