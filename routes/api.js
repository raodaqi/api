'use strict';
var router = require('express').Router();
var AV = require('leanengine');

var API = AV.Object.extend('API');
// 查询 Todo 列表
router.get('/', function(req, res, next) {
  res.render('api');
});

function validate(res,req,type,data){
    for(var i in data){
        if(type == "GET"){
            var value = req.query[i];
        }else{
            var value = req.body[i];
        }
        if(data[i]){
            //必须值
            if(!value){
                var result = {
                    code : "302",
                    message : data[i],
                    data : []
                }
                res.send(result);
                return "";
            }
        }
        data[i] = value;
    }
    return data;
}

// 查询 Todo 列表
router.get('/add', function(req, res, next) {
    //获取当前的appid
//    var appid = req.query.appid;
    var data = {
        app_id       : "appid不能为空",
        api_name    : "API名称不能为空",
        api_type    : "API所属类别不能为空",
        api_desc    : "",
        api_url     : "APIURI不能为空",
        api_request : "API请求方式不能为空",
        api_para    : "",
        api_demo    : ""
    }
    var data = validate(res,req,"GET",data);
    if(!data){
        return;
    }
    console.log(data);
    var api = new API();
    for(var i in data){
        api.set(i,data[i]);
    }
    api.save().then(function (api) {
        var result = {
            code : 200,
            data : api,
            message : "success"
        }
        res.send(result);
    }, function (error) {
        var result = {
            code : 500,
            message : "保存出错"
        }
        res.send(result);
    });
});

//获取app下所有的api接口
router.get('/list', function(req, res, next) {
    //获取当前的app_id
    var data = {
        app_id       : "appid不能为空"
    }
    var data = validate(res,req,"GET",data);
    if(!data){
        return;
    }
    console.log(data);
    var query = new AV.Query(API);

    for(var i in data){
        query.equalTo(i,data[i]);
    }
    query.find().then(function (apiList) {
        var dataArray = [];
        var apiJson = {};
        var apiData = [];
        for(var i = 0; i < apiList.length;i++){
            console.log(apiList[i].attributes.api_type);
            var api_type = apiList[i].attributes.api_type;
            if(api_type){
                for(var j = 0; j <= dataArray.length;j++){
                    if(dataArray[j] && dataArray[j].api_type == api_type){
                        console.log("456");
                        dataArray[j].api.push(apiList[i]);
                    }
                    if(j == dataArray.length){
                        console.log("789");
                        dataArray[j] = {
                            api_type : api_type,
                            api : []
                        }
                        dataArray[j].api.push(apiList[i]);
                        break;
                    }
                }
            }
        }
        console.log(dataArray);

        var result = {
            code : 200,
            data : dataArray,
            message : "success"
        }
        res.send(result);
    }, function (error) {
        var result = {
            code : 500,
            message : "保存出错"
        }
        res.send(result);
    });
});

module.exports = router;
