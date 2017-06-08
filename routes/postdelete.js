var express = require('express');
var router = express.Router();
var dbcrud = require('../model/mongodbcrud');

//DELETE POST return to homepage
router.get('/:name/:day/:title',function(req, res, next){
    req.query.name = req.params.name;
    req.query.title = req.params.title;
    console.log(req.query.name + "here came from DELETE");
    dbcrud.deletePost(req.query,function(err,resp){
        console.log(resp);
        if(resp.code == 2007){
            res.redirect('/');
        }
    });
});



//export js file
module.exports = router;