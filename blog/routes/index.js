var express = require('express');
var router = express.Router();
var crypto = require('crypto');
User = require('../models/user.js');
Post = require('../models/post.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    Post.get(null,function(err,posts){
        if(err){
            posts = [];
        }
        res.render('index',{
            title:'主页',
            user:req.session.user,
            posts:posts,
            success:"success",
            error:"false"
        })
    });
});
router.get('/123', function (req, res, next) {
    res.send("hello world!");
});
router.get('/reg', function (req, res) {
    res.render('reg', {
        title: "注册",
        user: req.session.user
    });
});
router.post('/reg', function (req, res) {
    var name = req.body.name;
    var password = req.body.password;
    var password_re = req.body['password-repeat'];

    if (password_re != password) {
        return res.redirect('/reg');
    }

    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');

    var newUser = new User({
        name: name,
        password: password,
        email: req.body.email
    });

    User.get(newUser.name, function (err, user) {
        if (err) {
            return res.redirect('/');
        }

        if (user) {
            //error 用户已存在
            return res.redirect('/reg');
        }

        newUser.save(function (err, user) {
            if (err) {
                return res.redirect('/reg');
            }
            console.log(req.session.user);
            console.log(user);
            req.session.user = user;
            res.redirect('/')
        });
    });
});
router.get('/login', function (req, res) {
    console.log("a");
    res.render('login', {title: "登录",user:req.session.user});
});
router.post('/login', function (req, res) {
    // res.render('login',{})
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    User.get(req.body.name,function(err,user){
        if(!user){
            res.send('用户不存在');
            return res.redirect('/login');
        }
        if(user.password != password){
            res.send('密码不对');
            return res.redirect('/login');
        }
        req.session.user =user;
        console.log(user);
        console.log("===========");
        console.log(req.session.user);
        req.session.user = user;
        res.redirect('/');
    })
});

router.get('/post',function (req, res) {
    console.log('post');
    res.render('post', {title: "发表",user:req.session.user})
});

router.post('/post',checkLogin, function (req, res) {
    var currentUser = req.session.user;
    console.log(currentUser);
    var post = new Post(currentUser.name,req.body.title,req.body.post);
    post.save(function(err){
        if(err){
            req.send('error 出现错误A');
        }
        res.redirect('/');
    })
});
router.get('/logout', function (req, res) {
    req.session.user = null;
    res.redirect('/');
});



module.exports = router;

function checkLogin(req,res,next){
    if(!req.session.user){
        res.send("未登录");
    }
    next();
}

function checkNotLogin(req,res,next){
    if(req.session.user){
        res.send("已登录");
    }
    next();
}
//module.exports = function(app){
//    app.get('/',function(req,res){
//        res.render('index',{title:"主页yuanjunwen"});
//    })
//app.get('/reg',function(req,res){
//    res.render('reg',{title:"注册"});
//})
//app.post('/reg',function(req,res){
//    //res.render()
//})
//app.get('/login',function(req,res){
//    res.render('login',{title:"登录"});
//})
//app.post('/login',function(req,res){
//   // res.render('login',{})
//})
//app.get('post',function(req,res){
//    res.render('post',{title:发表})
//})
//app.post('post',function(req,res){
//
//})
//app.get('/logout',function(req,res){
//
//})
//}
