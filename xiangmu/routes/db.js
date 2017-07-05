var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var conn1 = mongoose.createConnection('mongodb://localhost:27017/preInf1');
var schema1 = new Schema({ 
	userName:{type:String,unique:true},
    userId:{type:String},
	passWord:{type:String},
    userSex:{type:String},
    userAge:{type:String},
});
var User =  conn1.model('User',schema1);

/*添加账号信息*/
exports.register = function(req,res){//创建一个添加方法
	var user = new User({// 创建一个实体数据 从前端页面请求过来的数据
		userName:req.body.userName,
		passWord:req.body.passWord,
        userAge:req.body.userAge,
        userSex:req.body.userSex,
	})
	user.save(function(err,result){//将 user 的数据 通过sava 存到数据库 db.xiangmu.insert({})
		if(err){//如果添加失败
			if(err.code === 11000){
				res.json({message:{
					code:103
				}})
				return;
			}
			else{
				res.json({message:"未知错误"})
				return;
			}
		}
		else{
			console.log(result)
			res.json({message:{
				code:100
			}})
			return;
		}
	})
}
/*登录*/
exports.login = function(req,res){
	var useripone = {userName:req.body.userName};
	var pwd = {passWord:req.body.passWord};
	User.find(useripone,function(err,result){
		if(err){
			console.log(1)
		}
		else{
            console.log(result)
			if(result[0] == undefined){
				res.json({message:{
					code:102
					//账号不存在
				}})
			}
			else{
				if (pwd.userPwd!=result[0].userPwd){
					res.json({
                        message:{
                            code:103
                        }
					})
				}
				else{
					res.json({
                        message:{
                            code:100,
							json:result[0]
                        }
					})
				}
			}
		}
	})
}
/*根据mid查询账号信息*/
exports.getMid = function(req,res){
	var mid = req.body.mid;
	console.log(mid)
	User.findById(mid,function(err,result){
		if(err){
			console.log("错误："+err);
		}
		else{
			res.json({message:result});
			return;
		}
	})
}
/*密码修改*/
exports.updatePwd = function(req,res){
	var userPwd = {userpwd:req.body.userpwd}
	var userName = {username:req.body.username}

	User.update(userName,userPwd,function(err,result){
		if(err){
			console.log(err)
		}
		else{
			if(result.ok === 1){
				if(result.nModified ===1){
					res.json({message:{
						code:100
					}})
				}
				if(result.nModified ===0){
					res.json({message:{
						code:101
					}})
				}
			}
		}
	})
}
/*批量修改*/
exports.updateInfo = function(req,res){
    var id = req.body.mid;
    var arr = [{userAge:req.body.userAge},{userSex:req.body.userSex},{}]
    var i = 0;
    while(i<arr.length){
        //0<3
        (function(a){
            User.findByIdAndUpdate(id,arr[a],function(err,result){
                if (err) {
                    res.json({message:{
                        code:102
                    }})
                }
                else {
                    if(a == arr.length-1){
                        res.json({
                            message:result
                        })
                    }
                }
            })
        })(i)
        i++;
    }
}

/*添加文章*/
exports.articleRelease = function(req,res){
	var user1 = new User1({
		articleTitle:req.body.articleTitle,
		articleAuthor:req.body.articleAuthor,
		articleContent:req.body.articleContent,
		releaseTime:new Date(),
		releasePersonId:req.body.releasePersonId,
		articleImg:[]
	})
	user1.save(function(err,result){
		if(err){
			console.log(err)
		}
		else{
			res.json({code:100})
		}
	})
}
/*查询文章内容*/
exports.articleFind = function(req,res){
	console.log(req.body.mid)
	var releasePersonId = {releasePersonId:req.body.mid};
	User1.find(releasePersonId,function(err,result){
		if(err){
			console.log("错误："+err)
		}	
		else{
			console.log(result)
			res.json({msg:{
				code:100,
				ctn:result
			}})
		}
	})
}
/*分页查询文章列表*/
exports.getByPager=function(req,res){    
    var pageSize = 5;                   //一页多少条
    var currentPage = req.body.num;                //当前第几页
    var sort = {'logindate':1};        //排序（按登录时间倒序）
    var condition = {releasePersonId:req.body.mid};                 //条件
    var skipnum = (currentPage - 1) * pageSize;   //跳过数
    User1.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, result) {
        if (err) {
            console.log("Error:" + err);
        }
        else {
        	res.json({msg:{
				code:100,
				ctn:result
			}})
            console.log("Res:" +"\n\n\n\n\n\n\n"+ result);
        }
    })
}
/*信息条数 加载分页选项卡*/
exports.getCountByConditions=function(req,res){
    var wherestr = {releasePersonId:req.body.mid};
    User1.count(wherestr, function(err, result){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            res.json({
				num:result
			})
        }
    })
}
exports.getMid1 = function(req,res){
	var mid = req.body.mid;
	console.log(mid)
	User1.findById(mid,function(err,result){
		if(err){
			console.log("错误："+err);
		}
		else{
			res.json({message:result});
			return;
		}
	})
}
exports.login1 = function(req,res){
	console.log(1111)
	var mid = {};
	User.find(mid,function(err,result){
		if(err){
			console.log(1)
		}
		else{
			res.json({
				message:result
			})
			
		}
	})
}







/*





var Schema = mongoose.Schema;//构造一个数据模型 

var UserSchema = new Schema({//创建数据模型
	banji:{type:Object}
})
var User = mongoose.model('User',UserSchema);//调用mongoose.model方法 实现数据交互
exports.register = function(req,res){//创建一个添加方法
	var user = new User({// 创建一个实体数据 从前端页面请求过来的数据
		banji:{
			banjiname:,
			banjichengyuan:{

			}
		}
	})
	user.save(function(err,result){//将 user 的数据 通过sava 存到数据库 db.xiangmu.insert({})
		if(err){//如果添加失败
			
		}
		else{
			
		}
	})
}
json = {
	banjiname:name,
	banjichengyuan:{
		xuesheng1:{
			xuesheng1name:,
			xuesheng1zhuanye:,
			xuesheng1chengji:,
		},
		xuesheng2:{
			
		}
	}
}*/