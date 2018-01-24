let mongoose = require("mongoose")

let Order = new mongoose.Schema({
	userId:String,
	shopId:String,
	shopName:String,
	orderGoods:Array,
	totalPrice:Number
})

module.exports=mongoose.model('Order',Order)