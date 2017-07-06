var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var conn = mongoose.createConnection('mongodb://localhost:27017/preInf1');
var schema = new Schema({ 
	userName:{type:String,unique:true},
    userId:{type:String},
	passWord:{type:String},
    userSex:{type:String},
    userAge:{type:String},
});
var User =  conn.model('User',schema);

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