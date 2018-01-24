let express = require('express');
let router = express.Router();
let Banner = require("../model/banner.js");

router.get("/",function(req,res,next){
	Banner.find(function(err,doc){
		res.send(doc)
	})

})

module.exports = router