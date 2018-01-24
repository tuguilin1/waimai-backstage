let mongoose = require("mongoose")

let Banner = new mongoose.Schema({
	banner:[
		{
			picUrl:String,
			shopId:String
		}
	]
})

module.exports = mongoose.model('banner', Banner)