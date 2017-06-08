var express = require('express');
var router = express.Router();
var dbcrud = require('../model/mongodbcrud');
var crypto = require('crypto');


dbcrud();
/*GET RENDER REGISTER PAGE AND POST REGISTER CONTENTS */

router.get('/', function(req, res, next) {
  res.render('register', { 
    title: 'REGISTER',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});
router.post('/postform',function(req,res, next){
  if(req.body.password == req.body.passwordtest){
    console.log(req);
    var md5 = crypto.createHash('md5');
    req.body.password = md5.update(req.body.password).digest('hex');
    dbcrud.userInsert(req.body,function(err,resp){
      console.log(resp);
      if(err){
        res.send("502 Bad Gateway");
      }else if(resp.code == 2005){
        res.render('register', { title: '用户名已被注册' });
      }else if(resp.code == 1004){
        req.flash('success','注册成功');
        setTimeout(function(){
          res.redirect('/');
        },5000)
      };
    });
  }else{
    res.render('register', { title: 'ERROR' });
  }
});

module.exports = router;
