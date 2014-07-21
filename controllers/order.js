'use strict';
var Order = require("../models/order");

/**
 * Create a Order
 * put - /api/order
 * send: {id : string}
 * receive: {owner: String, recipient: object, gifter: Object, dueDate: Date, info: String, occasion: String}
 */
exports.create = function(req, res) {
    var order = new Order;
    order.owner = req.body.owner;
    order.recipient = req.body.recipient;
    order.gifter = req.body.gifter;
    order.dueDate = req.body.dueDate;
    order.info = req.body.info;
    order.occasion = req.body.occasion;

    order.save(function(err, order){
    	//if(err) res.send({error: err});
    	res.send({status : 'order created', id: order._id});;
    });
};


/*
 * Get all orders:
 * - Get- /api/order
 * - send: offset
 * - receive: [order]
*/
exports.getOrders = function(req, res){
	//infinite scroll or paging
	//var offset = req.query.offset ? req.query.offset : 0;

	//Order.find({}).sort({dateCreated:-1}).skip(offset).limit(10).exec(function(err, orders){
	Order.find({}).sort({dateCreated:-1}).exec(function(err, orders){
		if(err) res.send({error: err});
		//console.log(orders);
		res.send(orders);
	});
}

/*
 * Get all orders:
 * - Get- /api/order/:id
 * - send: {}
 * - receive: order
*/
exports.getOrderById = function(req, res){
	var id = req.params.id;
	Order.findOne({_id: id}, function(err, order){
		if (err) res.send({error:err});
		res.send(order);
	});
}

