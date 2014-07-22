'use strict';
var GiftList = require("../models/giftList");
var Order = require("../models/order");

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
 * - Get- /api/giftList/:id
 * - send: {}
 * - receive: List
*/
exports.getGiftListById = function(req, res){
	var id = req.params.id;
	GiftList.findOne({_id: id}, function(err, giftList){
		if (err) res.send({error:err});
		res.send(giftList);
	});
}

