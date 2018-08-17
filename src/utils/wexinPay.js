
/**
 * @method :微信支付方法
 * @param data
 */
let weixinPay  =(data,s,e)=>{
  var vm= this;
  if (typeof WeixinJSBridge == "undefined"){//微信浏览器内置对象。参考微信官方文档
    if( document.addEventListener ){
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady(data,s,e), false);
    }else if (document.attachEvent){
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady(data,s,e));
      document.attachEvent('onWeixinJSBridgeReady',onBridgeReady(data,s,e));
    }
  }else{
    onBridgeReady(data,s,e);
  }
}
/**
 * @method 支付费用方法
 * @param data:后台返回的支付对象,(详情微信公众号支付API中H5提交支付);
 */
function onBridgeReady(data,s,e){
  var  vm = this;
  WeixinJSBridge.invoke(
    'getBrandWCPayRequest',{
      "appId":data.appId,     //公众号名称，由商户传入
      "timeStamp":data.timeStamp, //时间戳，自1970年以来的秒数
      "nonceStr":data.nonceStr, //随机串
      "package":data.package,
      "signType":data.signType, //微信签名方式：
      "paySign":data.paySign //微信签名
    },
    function(res){
      // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
      if(res.err_msg == "get_brand_wcpay_request:ok" ){
        if(s){
          s();
        }
      }else{
        if(e){
          e();
        }
      }
    }
  );
}
export default weixinPay;
