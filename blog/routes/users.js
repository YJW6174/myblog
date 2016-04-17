var express = require('express');
var router = express.Router();
//var mongodb = require('./db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
//var mongodb = require('./db');
//function User(user){
//    this.name = user.name;
//    this.password  = user.password;
//    this.email = user.email;
//}
//
//module.exports = User;
//
//User.prototype.save = function(callback){
//    var user = {
//        name :this.name,
//        password : this.password,
//        email : this.email
//    };
//
//    mongodb.open(function(err,db){
//        if(err){
//            return callback(err);
//        }
//        db.collection('users',function(err,collection){
//            if(err){
//                mongodb.close();
//                return callback(err);
//            }
//            collection.insert(user,{
//                safe:true
//            },function(err,user){
//                mongodb.close();
//                if(err){
//                    return callback(err);
//                }
//                callback(null,user[0]);
//            })
//        })
//
//    })
//}
