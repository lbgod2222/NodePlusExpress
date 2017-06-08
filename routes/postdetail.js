var express = require('express');
var router = express.Router();
var dbcrud = require('../model/mongodbcrud');

router.get('/:name/:day/:title', function(req, res, next) {
    req.params.title = req.params.title
    dbcrud.postDetailQuery(req.params.name,req.params.day,req.params.title,function(err,resp){
        if (err) {
            res.send('出错啦！');
        }else if(resp.code == 1005){
            var posts = resp.data[0];
            console.log(posts)
            res.render('postdetail',{
                id:posts._id,
                title:posts.title,
                user: req.session.user,
                author: posts.name,
                postcontent: posts.post,
                postday: posts.time.total,
                queryday : posts.time.day,
                comment:posts.comment
                //success: req.flash('success');
            });
        }
    });
});


//POST THE COMMENT FOR ONE POST
router.post('/',function(req, res, next){
    console.log(req.body.postname + "here came from DELETE");
    dbcrud.commentPost(req.body,function(err,resp){
        console.log(resp);
        if(resp.code == 2007){
            res.redirect('/');
        }
    });
});

module.exports = router;