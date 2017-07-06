var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var conn = mongoose.createConnection('mongodb://localhost:27017/preInf2');
var schema = new Schema({ 
	StuName:{type:String},//姓名
    StuXH:{type:String},//学生学号
    StuSex:{type:String},//性别
	StuPwd:{type:String},//密码
	StuXY:{type:String},//学院
	StuZY:{type:String},//专业
	StuNJ:{type:String},//年级
	StuClass:{type:String},//班级
	StuKC:{type:String},//课程
	StuTel:{type:String},//电话
    StuScore:{type:String},//成绩
    StuAve:{type:String},//班级平均分
    StuBJG:{type:String},//不及格
    StuMax:{type:String},//班级最高分
});
var UserStu =  conn.model('UserStu',schema);
exports.addStud = function(req,res){//创建一个添加方法
	var userStu = new UserStu({// 创建一个实体数据 从前端页面请求过来的数据
		StuName:req.body.StuName,
		StuPwd:req.body.StuPwd,
        StuXH:req.body.StuXH,
        StuSex:req.body.StuSex,
        StuTel:req.body.StuTel,
        StuXY:req.body.StuXY,
        StuZY:req.body.StuZY,
        StuNJ:req.body.StuNJ,
        StuClass:req.body.StuClass,
        StuKC:req.body.StuKC,
        StuTel:req.body.StuTel,
        StuScore:req.body.StuScore,
        StuAve:req.body.StuAve,
        StuBJG:req.body.StuBJG,
        StuMax:req.body.StuMax,
	})
	userStu.save(function(err,result){//将 user 的数据 通过sava 存到数据库 db.xiangmu.insert({})
		if(err){//如果添加失败
			console.log(err)
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
exports.findStud = function(req,res){
	var wherestr = {};
    UserStu.find(wherestr, function(err, result){
        if (err) {
            console.log("Error:" + err);
        }
        else {
           	res.json({message:result})
        }
    })
}
exports.findFenye = function(req,res){
	 var pageSize = 5;                   //一页多少条
    var currentPage = 1;                //当前第几页
    var sort = {'logindate':-1};        //排序（按登录时间倒序）
    var condition = {};                 //条件
    var skipnum = (currentPage - 1) * pageSize;   //跳过数
    UserStu.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, result) {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            res.json({message:result})
        }
    })

}
///通过id去删除
exports.rem = function(req,res){
	 var id = req.body.id;
    
    UserStu.findByIdAndRemove(id, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })

}
/*exports.updateStudScore=function(req,res){
	var UserStu=require('./student.js')
	var wherestr={'StuXh':''};
	var updatastr={'StuScore':''};
	UserStu.update(wherestr,updatastr,function(err,res){
		if(err){
			console.log("Error:"+err);
		}
		else{
			console.log("Res:"+res);
		}
	})

}

exports.updataStuClass=function(req,res){
	 var UserStu=require('./student.js');
	 var wherestr={'StuXY':''};
	 var updatastr={'StuZY':''};
	 UserStu.update(wherestr,updatastr,function(err,res){
		if(err){
			console.log("Error:"+err);
		}
		else{
			console.log("Res:"+res);
		}
	})
}
/*exports.getByConditions=function(req,res){

}
/*exports.updateInfo = function(req,res){
    var id = req.body.mid;
    var arr = [{Stu:req.body.userAge},{userSex:req.body.userSex},{}]
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
}*/
