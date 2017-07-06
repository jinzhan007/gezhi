var express = require("express");//载入一个express 框架
var bodyParser = require("body-parser");//载入body-parser 这个用于解析路由过程 响应 请求JSON格式的数据
var User = require("./routes/userdb.js");//载入一个我们写好的本地的mongoose
var UserStu = require('./routes/student.js');
var app = express();//使用模块 把模块封装到一个变量
app.use(bodyParser.json());//解析json的方法
app.use(bodyParser.urlencoded({extended:false}));//解析URL 使用的是node 里面的QUERY STRING 
app.use(express.static('public'));//托管本地的静态资源

app.get('/',function(req,res){//设置一个默认初始的页面 
	res.redirect('register.html');
})
//第一张表的接口
app.post('/register',User.register);//用来 接受请求 或者是 给请求体 提供一个接口
app.post('/login',User.login);
app.post('/updateInfo',User.updateInfo);


//第二章表的接口
app.post('/addStud',UserStu.addStud)
//app.post('/updateInStud',UserStu.updateInStud)
//app.post('/updataStuClass',UserStu.updataStuClass)
app.post('/findStud',UserStu.findStud)
app.post('/findFenye',UserStu.findFenye)
//端口号
app.listen(3000);
console.log("服务器启动成功");//入口文件