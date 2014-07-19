'use strict';
var Gift = require("../models/order");
var aws = require("aws-lib");

var AWSAccessKeyId = "AKIAIAFNGLJVXRKCLECA",
	AWSSecretKey="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";

/**
 * Create a Gift
 * put - /gift
 * send: {id : string}
 * receive: {title: String, description: String, tags: [String]}
 */
exports.create = function(req, res) {
    res.send("nice");
};

/**
 * get a gift by id
 * get - /gift
 * send: [Gifts]
 * receive: [ASINs of gifts]
 */
exports.getByID = function(req, res){

	//CA
	var prodAdv = aws.createProdAdvClient(AWSAccessKeyId, AWSSecretKey, "xenia0c-20", {region:"CA", host:"ecs.amazonaws.ca"});

	//US
	//var prodAdv = aws.createProdAdvClient(AWSAccessKeyId, AWSSecretKey, "canyouevengif-20");

	prodAdv.call(
		"ItemLookup", { 
			ItemId: req.query.itemId,
			ResponseGroup : "Medium"
			}, 
		function(err, result) {
   			//console.log(JSON.stringify(result));
   			res.send(JSON.stringify(result.Items));
 	});
};
