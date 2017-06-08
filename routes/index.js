var express = require('express');
var router = express.Router();
var dbcrud = require('../model/mongodbcrud');
var markdown = require('markdown').markdown;

/* GET render home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.user);
  //GET whole post of the current user
  var posts = [];
  dbcrud.postQuery(req.session.user,function(err,resp){
    if(err){
      return;
    }else{
      var postdata = resp.data;
      console.log(postdata);
      //MarkDown化出现错误
      //postdata.post = markdown.toHTML(postdata.post);
      /*postdata.forEach(function(data,index) {
        data.post = markdown.toHTML(data.post);
      }, this);*/
      posts = postdata;
      res.render('index',{
        title: 'POSTS',
        user: req.session.user,
        posts: posts
        //success: req.flash('success');
      });
    }
  });
});

module.exports = router;
