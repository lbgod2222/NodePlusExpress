var express = require('express');
var router = express.Router();
var dbcrud = require('../model/mongodbcrud');
var crypto = require('crypto');

/* GET login listing and render page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: '登录' });
});
router.post('/postform',function(req, res, next){
  var user = req.body.name;
  if(!req.body.name || !req.body.password){
    res.render('login', { title: '请填写内容'});
  }else{
    var md5 = crypto.createHash('md5');
    req.body.password = md5.update(req.body.password).digest('hex');
    dbcrud.userQuery(true,req.body,function(err,resp){
      console.log(resp);
      if (resp.code === 1005) {
        console.log(1005);
        if (resp.data.password == req.body.password) {
          req.session.user = user;
          res.redirect('/');
        }else{
          res.render('login', {title:'密码不正确'});
        }
      }else{
          res.render('login', {title:'用户不存在'});
      }
    });
  }
})

module.exports = router;
