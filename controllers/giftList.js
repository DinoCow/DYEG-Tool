'use strict';
var GiftList = require("../models/giftList");
var Order = require("../models/order");
var Gift = require("../models/gift");
var aws = require("aws-lib");

var AWSAccessKeyId = "AKIAIAFNGLJVXRKCLECA",
	AWSSecretKey="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";

/**
 * Create a Order
 * put - /api/order/:id/giftList
 * send: {id : string}
 * receive: {name: String}
 */
exports.create = function(req, res) {
    var giftList = new GiftList;
    giftList.name = req.body.name;

    giftList.save(function(err, giftList){
    	//if(err) res.send({error: err});
    	var conditions = { _id: req.params.id }
		, update = { $push: { giftLists: giftList._id }}
		, options = { multi: false };

		Order.update(conditions, update, options, callback);
		function callback (err, numAffected) {
	  		// numAffected is the number of updated documents
	  		    	res.send(giftList);
	  	}
    });
};


/*
 * Get all orders:
 * - Get- /api/order/:id/giftList
 * - send: offset
 * - receive: [order]
*/
exports.getGiftLists = function(req, res){
	//infinite scroll or paging
	//var offset = req.query.offset ? req.query.offset : 0;

	//Order.find({}).sort({dateCreated:-1}).skip(offset).limit(10).exec(function(err, orders){
	Order.findOne({_id: req.params.id}).exec(function(err, order){
		if(err) res.send({error: err});

		GiftList.find({_id: { $in: order.giftLists}}).exec(function(err, giftLists){
			res.send(giftLists);
		});
	});
}

/*
 * Get all orders:
 * - Get- /api/order/:orderId/giftList/:giftListId
 * - send: {}
 * - receive: List
*/
exports.getGiftListById = function(req, res){
	var id = req.params.giftListId;
	GiftList.findOne({_id: id}, function(err, giftList){
		if (err) res.send({error:err});
		Gift.find({_id: { $in: giftList.gifts}}).exec(function(err, gifts){
			res.send({gifts:gifts, name: giftList.name});
		});
	});
}

exports.addGift = function(req, res){
	var id = req.params.id;
	var gift = new Gift;
    gift.name = req.body.name;
    gift.asin = req.body.asin;
    gift.url = req.body.url;
    gift.thumbnail = req.body.thumbnail;
    gift.price = req.body.price;

    gift.save(function(err, gift){
    	//if(err) res.send({error: err});
    	var conditions = { _id: id }
		, update = { $push: { gifts: gift._id }}
		, options = { multi: false };

		GiftList.update(conditions, update, options, callback);
		function callback (err, numAffected) {
			console.log(numAffected)
	  		// numAffected is the number of updated documents
	  		res.send(gift);
	  	}
    });


}

exports.addGiftByASIN = function(req,res){
	var id = req.params.id;
	var prodAdv = aws.createProdAdvClient(AWSAccessKeyId, AWSSecretKey, "canyouevengif-20");

	prodAdv.call(
		"ItemLookup", { 
			ItemId: req.body.itemId,
			ResponseGroup : "Medium"
		}, 
		function(err, result) {
   			//console.log(JSON.stringify(result));
   			var item = result.Items.Item;
			var gift = new Gift;
		 	gift.asin = item.ASIN;
			if (item.ItemAttributes){
				 if (item.ItemAttributes.Title) gift.name = item.ItemAttributes.Title;
				 if (item.ItemAttributes.ListPrice) gift.price = item.ItemAttributes.ListPrice.FormattedPrice;
			}
		    if (item.DetailPageURL) gift.url = item.DetailPageURL;
		    if (item.MediumImage.URL) gift.thumbnail = item.MediumImage.URL;
		    
		    gift.save(function(err, gift){
		    	//if(err) res.send({error: err});
		    	var conditions = { _id: id }
				, update = { $push: { gifts: gift._id }}
				, options = { multi: false };

				GiftList.update(conditions, update, options, callback);
				function callback (err, numAffected) {
					//console.log(numAffected)
			  		// numAffected is the number of updated documents
			  		res.send(gift);
			  	}
	    });
	});
}

exports.remove = function(req, res){
	var id = req.params.id,
	giftId = req.query.giftId;

	var conditions = { _id: id }
		, update = { $pull: { gifts: giftId }}
		, options = { multi: false };

	GiftList.update(conditions, update, options, callback);
	Gift.findOne({_id: giftId}).remove().exec(callback);

	function callback(err, numAffected){
	}
	res.send(200);

}

