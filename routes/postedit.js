var express = require('express');
var router = express.Router();
var dbcrud = require('../model/mongodbcrud');


//GET render postedit page and POST post changes
router.get('/:name/:day/:title', function(req, res, next) {
    req.params.title = req.params.title
    dbcrud.postDetailQuery(req.params.name,req.params.day,req.params.title,function(err,resp){
        if (err) {
            res.send('出错啦！');
        }else if(resp.code == 1005){
            var posts = resp.data[0];
            res.render('postedit',{
                title:posts.title,
                user: req.session.user,
                author: posts.name,
                postcontent: posts.post,
                postday: posts.time.total,
                queryday: posts.time.day
                //success: req.flash('success');
            });
        }
    });
});

//POST changes
router.post('/edit',function(req, res, next){
    console.log(req.body.name + "here came from POST");
    dbcrud.saveChange(req.body,function(err,resp){
        console.log(resp);
        if(resp.code == 2006){
            res.redirect('/');
        }
    });
});


//export js file
module.exports = router;