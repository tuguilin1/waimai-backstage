let express = require('express');
let router = express.Router();
var url = require('url');
var util = require('util');
let Shop = require("../model/goods.js");
let Order = require("../model/order.js")
let roseShop = Shop.roseShop

router.get("/",function(req,res,next){
	const num = req.query.num
	roseShop.find(function(err,doc){
		res.send(doc)
	}).limit(parseInt(num))

})
router.post("/order",function(req,res,next){
	let data=req.body.slice(0)
	let data1=data.shift()
	roseShop.find({"_id":data1.shopId},function(err,doc){
		if(err){
			console.log(err)
		}
		else{
			if(doc.length){
				doc[0].shopGoods.forEach((item)=>{
					data.forEach((_item)=>{
						if(item._id==_item._id){
							item.goodsSales += _item.index
						}
					})
				})
				console.log(doc[0])
				doc[0].save(function(err){
					if(!err){
						res.send({
							status:1,
							msg:"购买成功"
						})
					}
					else{
						res.send({
							status:0,
							msg:"购买失败"
						})
					}
				})
			}
		}
	})
	let orderList = new Order({
		shopId:data1.shopId,
		shopName:data1.shopName,
		userId:data1.userId,
		totalPrice:data1.totalPrice,
		orderGoods:JSON.parse(JSON.stringify(data1.orderGoods))
	})
	orderList.save()
})
router.post("/orderlist",function(req,res,next){
	const data = req.body
	Order.find(data,function(err,doc){
		if(err){
			console.log(err)
		}
		else{
			if(doc.length){
				res.send(doc)
			}
		}
	})
})
router.post("/special",function(req,res,next){
	const temp = req.body.tag
	if(temp == "全部"){
		roseShop.find(function(err,doc){
			if(!err){
				res.send({
					status:1,
					msg:doc
				})
			}
		})
	}
	else{
		roseShop.find({tag:temp},function(err,doc){
			if(!err){
				res.send({
					status:1,
					msg:doc
				})
			}
		})
	}
})
module.exports = router