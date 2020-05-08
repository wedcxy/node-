const express=require('express')
const bodyParser=require('body-parser')
const mysql = require("mysql")
const app=express();

//jwt产生token
const jwt=require('jsonwebtoken')
//检验token
// const expressJWT=require('express-jwt')

//导入接口文件
const login = require('./api/user/login');
const file = require('./api/list/flie')
const inquireFile = require('./api/list/inquireFile')

//配置检验token
// app.use(expressJWT({secret: 'Bearer '})
//     .unless({path: ['/api/login']}))


//配置前端跨域
app.all('*', function (req, res, next) {
  //响应头指定了该响应的资源是否被允许与给定的origin共享。*表示所有域都可以访问，同时可以将*改为指定的url，表示只有指定的url可以访问到资源 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",  " Origin, X-Requested-With, Content-Type, Accept");
    //允许请求资源的方式
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });


//解析post请求数据
// 解析 application/json
app.use(bodyParser.json()); 
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

//配置静态文件
app.use(express.static('./dist'))

//配置接口文件
app.use('/api',file)
app.use('/api',login)
app.use('/api',inquireFile)

//监听端口
app.listen(8999,()=>{
    console.log("http://localhost:8999")
})