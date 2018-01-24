var express = require('express');
var router = express.Router();
let User = require("../model/user.js");
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.post('/login', function(req, res, next) {
    const doc1=new User({
    	username:req.body.username,
    	password:req.body.password,
    	address:req.body.address,
    	phonenumber:req.body.phonenumber,
    })
    const data={
    	phonenumber:req.body.phonenumber,
    }
    User.find(data,function(err,doc){
    	if(err){
    		console.log(err)
    	}
    	else{
    		if(doc.length){
	    		res.send({
	    			status:0,
	    			msg:"该手机号已被注册过",
	    			username:doc[0].username
	    		})
    		}
    		else{
    			doc1.save()
	    		res.send({
	    			status:1,
	    			msg:"注册成功"
	    		})
    		}

    	}
    })
});
router.post("/register",function(req,res,next){
	const doc1={
    	phonenumber:req.body.phonenumber,
    }
    User.find(doc1,function(err,doc){
    	if(err){
    		console.log(err)
    	}
    	else{
    		if(doc.length){
    			if(req.body.password===doc[0].password){
    				res.send({
    					status:1,
    					msg:"登陆成功",
    					username:doc[0].username,
                        id:doc[0]._id
    				})
    			}
    			else{
    				res.send({
    					status:0,
    					msg:"密码错误"
    				})
    			}
    		}
    		else{
    			console.log(doc)
    			res.send({
    				status:0,
    				msg:"无此账号，请先注册"
    			})
    		}
    	}
    })
})
router.post("/logined",function(req,res,next){
    const data=req.body
    User.find(data,function(err,doc){
        if(err){
            res.send({
                status:0,
                msg:"请求失败"
            })
        }
        else{
            if(doc.length){
                res.send({
                    status:1,
                    msg:doc[0]
                })
            }
        }
    })
})
module.exports = router;
