var express = require('express');
var router = express.Router();
var dbcrud = require('../model/mongodbcrud');

/*Get render post page and post post content */
router.get('/', function(req, res, next) {
  res.render('post', { title: 'POST' });
});
router.post('/postform', function(req, res, next) {
  req.body.name = req.session.user;
  if(!req.body.name){
    res.render('post', { title: '登陆已经过期，请重新登录' });
  }else if(!req.body.title || !req.body.post){
    res.render('post', { title: '标题与内容不能为空' });
  }else{
    dbcrud.postInsert(req.body,function(err,resp){
      if (resp.code == 2001){
        res.render('post', { title: '发布成功' });
      }
    });
  }
});

module.exports = router;