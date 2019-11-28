/** dictionary utils */

const dictionary = {};

//菜单状态
dictionary["shop_type"] = [
  { code: 1, desc: "普通客户" },
  { code: 2, desc: "白云客户" },
  { code: 3, desc: "批发商" },
  { code: 4, desc: "大型批发商" }
];

// 验光服务
dictionary["optometry_type"] = [
  { code: 1, desc: "普通验光" },
  { code: 2, desc: "渐进验光" },
  { code: 3, desc: "视功能检查" },
  { code: 4, desc: "无需验光" }
];

// 订单服务类型
dictionary["order_service"] = [
  { code: 1, desc: "购置镜片" },
  { code: 2, desc: "只需加工" },
  { code: 3, desc: "无需镜片和加工" }
];

// 订单状态
dictionary["order_status"] = [
  { code: 0, desc: "待付款" },
  { code: 1, desc: "待加工" },
  { code: 2, desc: "加工中" },
  { code: 9, desc: "已完成" },
  { code: 10, desc: "已取消" },
  { code: 11, desc: "已删除" }
];

const getDictDesc = function(type, code) {
  let desc = "";
  for (let item of dictionary[type]) {
    if (item.code == code) {
      desc = item.desc;
      break;
    }
  }
  return desc;
};
export default {
  dictionary,
  getDictDesc
};
