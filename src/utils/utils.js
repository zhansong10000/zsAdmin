export function getParam(that,name){
  var query = that.$route.query;
  return query[name];
}
