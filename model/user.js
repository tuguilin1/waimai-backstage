let mongoose = require("mongoose")

let User = new mongoose.Schema({
	username:String,
	password:String,
	address:String,
	phonenumber:String
})

module.exports = mongoose.model('User',User)