export function getParam(that, name) {
  var query = that.$route.query;
  return query[name];
}
/**
 *深度克隆对象
 *@param {object} [obj] [需要深度克隆的对象]
 *@return {object} [newobj] [返回克隆后的新对象]
 */
export function deepClone(obj) {
  var str,
    newobj = obj.constructor === Array ? [] : {};
  if (typeof obj !== "object") {
    return;
  } else if (window.JSON) {
    (str = JSON.stringify(obj)), //序列化对象
      (newobj = JSON.parse(str)); //还原
  } else {
    for (var i in obj) {
      newobj[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return newobj;
}
