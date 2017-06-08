// COMMMON SETTING
var mongoose = require('mongoose');
var crypto = require('crypto');
//connect the db
var db = mongoose.createConnection('mongodb://127.0.0.1:27017/multiuserblog');
//test
console.log(db);
//user document for login & register use
var userSchema = new mongoose.Schema({
    name:{type:String},
    password:{type:String},
    email:{type:String}
});

//post document for post & read use
var postSchema = new mongoose.Schema({
    name:{type:String},
    title:{type:String},
    post:{type:String},
    tags:[{name:String}],
    comment:[{nickname:String, time:String, comment:String}],
    time:{}
});
//other document write here

//define the function of each model write hereI(before the compile)

//compile the model 
var userModel = db.model('user',userSchema);
var postModel = db.model('post',postSchema);

//define the CRUD interface
function dbcrud(){
    console.log("this is the crudfile");
};

//userInsert
dbcrud.userInsert = function(info,callback){
    //check for the reduplicate name
    var content_test = {name:""+info.name};
    return userModel.find(content_test,function(err,doc){
        if(err){
            var resp = {
                code:3002,
                message:"数据库查询失败"+ err
            };
            callback(err,resp);
            return;
        }else if(doc.length===0){
            var resp = {
                code:1004,
                message:"注册成功"
            };
            insert(info);
            callback(null,resp);
        }else{
            var resp = {
                code:2005,
                message:"用户已被注册"
            };
            callback(null,resp);
            return;
        }
    });
    //actually insert 
        function insert(infor){
        var content = {name:""+infor.name,password:infor.password,email:infor.email};
        var monModel = new userModel(content);
        return monModel.save(function(err){
        if(err){
            return err;
        }else{
           return;
        }
    });
    };
};

//userQuery
dbcrud.userQuery = function(isPrecise,info,callback){
    if(isPrecise == true){
        var content = {name:info.name};
        userModel.findOne(content,function(err,doc){
            if(doc){
                var resp = {
                    code:1005,
                    message:"查询成功",
                    data:doc
                }
                callback(null,resp);
            }else{
                var resp = {
                    code:3002,
                    message:"该用户不存在"
                };
                callback(err,resp);
            }
        });
    };
    if(isPrecise == false){
        var content = info.name;
        userModel.find({name:'/'+content+'/'},function(err,doc){
            if(doc){
                 var resp = {
                    code:1004,
                    message:"查询成功",
                    data:doc
                };
                callback(null,resp);
            }else{
                var resp = {
                    code:3002,
                    message:"该用户不存在"
                };
                callback(null,doc);
            }
        });
    };
};


//Insert the post
dbcrud.postInsert = function(info,callback){
    var date = new Date;
    var time = {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDay(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
        date: date.getDate(),
        total: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay()
    };
    var content = {name:""+info.name,title:info.title,post:info.post,tags:info.tags,time:time};
    console.log(content);
    var posModel =new postModel(content);
    return posModel.save(function(err){
        if(err){
            return err;
        }else{
            var resp = {
                code:2001,
                message:"文章发布成功",
            };
            callback(null,resp);
            return;
        }
    });
};

//Query all post for one user
dbcrud.postQuery = function(name,callback){
    return postModel.find({name:name},function(err,doc){
        if(err){
            var resp = {
                code: 3002,
                message:"数据查询失败"+err
            }
            callback(err,resp);
            return err;
        }else{
            var resp = {
                code: 1005,
                message: "查询成功",
                data: doc
            }
            callback(null,resp);
        }
    });
};

//Query particular post of one user
dbcrud.postDetailQuery = function(name,day,title,callback){
    return postModel.find({name:name})
            //.where('time.day',day)
            .where('title',title)
            .exec(function(err,doc){
                console.log(doc+'数据库doc');
                if(err){
                    var resp = {
                        code: 3002,
                        message:"数据查询失败"+err
                    };
                    callback(err,resp);
                    return err;
                }else{
                    var resp = {
                        code: 1005,
                        message:"查询成功",
                        data:doc
                    };
                    callback(null,resp);
                }
            });
};


//Save the edit from the postedit page
dbcrud.saveChange = function(req,callback){
    return postModel.where({name: req.name}) 
                    .where({title: req.title})
                    .update({post: req.post},function(err){
                        if(err){
                            var resp = {
                                code: 3003,
                                message:"数据更新失败"+err
                            }; 
                            callback(err,resp);
                        }else{
                            var resp = {
                            code: 2006,
                            message:"更新成功"
                            };
                            callback(null,resp);
                        }
                    });
}

//Delete the post from the postedit page
dbcrud.deletePost = function(req,callback){
    return postModel.where({name: req.name}) 
                    .where({title: req.title})
                    .remove(function(err){
                        if(err){
                            var resp = {
                                code: 3003,
                                message:"数据更新失败"+err
                            }; 
                            callback(err,resp);
                        }else{
                            var resp = {
                            code: 2007,
                            message:"删除成功"
                            };
                            callback(null,resp);
                        }
                    });
}

//Post the comments for one passage
dbcrud.commentPost = function(req,callback){
    var date = new Date();
    return postModel.update({_id:req.postid},{'$push':{'comment':{'nickname':req.nickname,'comment':req.comment,'time':date.getMonth()+'-'+date.getDate()+'-'+date.getFullYear()}}},function(err,doc){
        console.log(req.postid);
        if(err){
                        var resp = {
                            code:3003,
                            message: "数据更新失败" + err
                        }
                        callback(err,resp);
                        return;
                    }else{
                        var resp = {
                            code:2008,
                            message: "评论增加成功"
                        }
                        callback(err,resp);
                    }
    });
}          
//exports dbcrud
module.exports = dbcrud;