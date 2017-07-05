var express = require("express");//载入一个express 框架
var bodyParser = require("body-parser");//载入body-parser 这个用于解析路由过程 响应 请求JSON格式的数据
var User = require("./routes/db.js");//载入一个我们写好的本地的mongoose
var app = express();//使用模块 把模块封装到一个变量
app.use(bodyParser.json());//解析json的方法
app.use(bodyParser.urlencoded({extended:false}));//解析URL 使用的是node 里面的QUERY STRING 
app.use(express.static('public'));//托管本地的静态资源

app.get('/',function(req,res){//设置一个默认初始的页面 
	res.redirect('register.html');
})

app.post('/register',User.register);//用来 接受请求 或者是 给请求体 提供一个接口
app.post('/login',User.login);
app.post('/login1',User.login1);
app.post('/getMid',User.getMid);
app.post('/getMid1',User.getMid1);
app.post('/updatePwd',User.updatePwd);
app.post('/updateInfo',User.updateInfo);
app.post('/register1',User.register);
app.post('/articleRelease',User.articleRelease);
app.post('/articleFind',User.articleFind);
app.post('/getByPager',User.getByPager);
app.post('/getCountByConditions',User.getCountByConditions);
app.listen(3000);
console.log("服务器启动成功");//入口文件