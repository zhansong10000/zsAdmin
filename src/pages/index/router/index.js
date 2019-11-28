import Vue from "vue";
import Router from "vue-router";

/** 首页 */
const homepage = r =>
  require.ensure([], () => r(require("../views/home/homepage")), "homepage");
/** ######*/
/** 订单管理 */
const order = r =>
  require.ensure([], () => r(require("../views/order/order")), "order");
/** ######*/
/** 商铺管理 */
const shop = r =>
  require.ensure([], () => r(require("../views/wechat/shop")), "shop");
/** 客户管理 */
const customer = r =>
  require.ensure([], () => r(require("../views/wechat/customer")), "customer");

/** ######*/
/**供应商管理 */
const supplier = r =>
  require.ensure(
    [],
    () => r(require("../views/supplier/supplier")),
    "supplier"
  );
/** ######*/
/**产品类型 */
const product = r =>
  require.ensure([], () => r(require("../views/goods/product")), "product");

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/homepage"
    },
    {
      path: "/homepage",
      meta: {
        navName: "首页",
        keepAlive: true
      },
      component: homepage
    },
    {
      path: "/order",
      meta: {
        navName: "订单管理",
        keepAlive: true
      },
      component: order
    },
    {
      path: "/shop",
      meta: {
        navName: "商铺管理",
        keepAlive: true
      },
      component: shop
    },
    {
      path: "/customer",
      meta: {
        navName: "公众号客户",
        keepAlive: true
      },
      component: customer
    },
    {
      path: "/supplier",
      meta: {
        navName: "供应商管理",
        keepAlive: true
      },
      component: supplier
    },
    {
      path: "/product",
      meta: {
        navName: "产品类型",
        keepAlive: true
      },
      component: product
    }
  ]
});
