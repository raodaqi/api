'use strict';
var router = require('express').Router();
var AV = require('leanengine');

function sendError(res,code,message){
	var result = {
		code:code,
		message:message,
		data:[]
	}
	res.send(result);
}

var APP = AV.Object.extend('APP');

// 查询 Todo 列表
router.get('/', function(req, res, next) {
  res.render('app');
});


// 查询 Todo 列表
router.get('/create', function(req, res, next) {
	var app_name = req.query.app_name;
	var app_desc = req.query.app_desc;

  	var query = new AV.Query(APP);
  	//去除空格
  	app_name = app_name.replace(/(^\s+)|(\s+$)/g,"");
  	app_name = app_name.replace(/\s/g,"");
  	query.equalTo('app_name',app_name);

  	query.find().then(function(results) {
    	console.log(results);
    	//判断是否存在
    	if(results.length){
    		//存在
    		console.log("存在");
    		var result = {
			   	code : 601,
			    message : "项目已存在"
			}
			res.send(result);
    	}else{
    		//不存在
    		//创建应用
    		var App = new APP();
    		App.set("app_name",app_name);
    		App.set("app_desc",app_desc);
    		App.save().then(function (app) {
			    var result = {
			    	code : 200,
			    	data : app,
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
    	}
  	}, function(err) {
    	if (err.code === 101) {
			res.send(err);
	    } else {
	      next(err);
	    }
	}).catch(next);
});

// 查询 Todo 列表
router.get('/list', function(req, res, next) {
  	var query = new AV.Query(APP);
  	query.descending('createdAt');
  	query.find().then(function(results) {
//    	console.log(results);
    	//判断是否存在
    	var result = {
			code : 200,
			data : results,
			message : "success"
		}
		res.send(result);
  	}, function(err) {
    	if (err.code === 101) {
			res.send(err);
	    } else {
	      next(err);
	    }
	}).catch(next);
});

// 查询详情
router.get('/detail', function(req, res, next) {
    var id = req.query.id;
    if(!id){
        sendError(res,457,"缺少项目id");
        return;
    }
    var query = new AV.Query(APP);
    query.get(id).then(function(results) {
//    	console.log(results);
        //判断是否存在
        var result = {
            code : 200,
            data : results,
            message : "success"
        }
        res.send(result);
    }, function(err) {
        if (err.code === 101) {
            res.send(err);
        } else {
            next(err);
        }
    }).catch(next);
});

// 查询详情
router.get('/delete', function(req, res, next) {
    var id = req.query.id;
    if(!id){
        sendError(res,457,"缺少项目id");
        return;
    }
    var todo = AV.Object.createWithoutData('APP', id);
    todo.destroy().then(function (success) {
        // 删除成功
        //判断是否存在
        var result = {
            code : 200,
            data : [],
            message : "success"
        }
        res.send(result);
    }, function (error) {
        // 删除失败
        res.send(error);
    });
});

module.exports = router;
