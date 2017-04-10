/*!
 * 向后台发送数据
 * url(String):请求链接
 * type(String):请求类型
 * data(Object):请求参数
 * callback(function):回调方法
 */
function sendQuery(url,type,data,callback){
   $.ajax({
       type: type,
       url: url,
       data: data,
       dataType: "json",
       success:function(result){
           if(result.code == 200){
               callback.success(result);
           }else{
               callback.error(result);
           }
       },
       error:function(error){
           alert("服务器出错");
           callback.error(error);
       }
   })
}
/*!
 *获取该平台所有项目的接口
 */
function getAPPList(data,callback){
   var url = "http://apimanage.leanapp.cn/app/list";
   var type = GET;
   sendQuery(url,type,data,callback);
}
/*!
 *获取api的结果
 *api_id(string) :api的objectid 必须值
 */
function getAPIResult(data,callback){
   var url = "http://apimanage.leanapp.cn/api/get_api_result";
   var type = GET;
   sendQuery(url,type,data,callback);
}
/*!
 *获取该项目内所有接口
 *app_id(string) :项目id 必须值
 */
function 获取项目内所有接口(data,callback){
   var url = "http://apimanage.leanapp.cn/api/list";
   var type = GET;
   sendQuery(url,type,data,callback);
}
