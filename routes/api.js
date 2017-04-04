'use strict';
var router = require('express').Router();
var AV = require('leanengine');

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
            if(value){
                var result = {
                    code : "302",
                    message : data[i],
                    data : []
                }
                res.send(result);
                return;
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
        appid       : "appid不能为空",
        api_name    : "api_name不能为空",
        api_type    : "",
        api_desc    : "",
        api_url     : "",
        api_request : "",
        api_para    : "",
        api_demo    : ""
    }
    var data = validate(res,req,"GET",data);
    console.log(data);
});

module.exports = router;
