'use strict';
var Gift = require("../models/order");
var aws = require("aws-lib");

var AWSAccessKeyId = "AKIAIAFNGLJVXRKCLECA",
	AWSSecretKey="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";

/**
 * get a gift by id
 * get - /gift
 * send: [Gifts]
 * receive: [ASINs of gifts]
 */
exports.getGifts= function(req, res){

	//CA
	//var prodAdv = aws.createProdAdvClient(AWSAccessKeyId, AWSSecretKey, "xenia0c-20", {region:"CA", host:"ecs.amazonaws.ca"});

	//US
	var prodAdv = aws.createProdAdvClient(AWSAccessKeyId, AWSSecretKey, "canyouevengif-20");

	prodAdv.call(
		"ItemSearch", { 
			Keywords: req.query.Keywords,
			SearchIndex : "Blended",
			ResponseGroup : "Medium",
			ItemPage: req.query.ItemPage
			}, 
		function(err, result) {
   			//console.log(JSON.stringify(result));
   			res.send(JSON.stringify(result.Items));
 	});
};
