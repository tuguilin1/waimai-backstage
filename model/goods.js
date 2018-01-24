let mongoose = require("./mongoose.js")

var Shop = new mongoose.Schema({
	shopName:String,
	shopId:String,
	shopPic:String,
	totalSales:Number,
	tag:String,
	shopGoods:[
			{
				goodsName:String,
				goodsId:String,
				goodsPrice:String,
				goodsPic:String,
				goodsSales:Number
			}
	]
}) 

module.exports.roseShop = mongoose.model('roseShop', Shop)