'use strict';
var express = require('express');

module.exports = function(app) {
    var auth = express.basicAuth("admin" , "Welcome123");
    // Home route
    var order = require('../controllers/order');
    app.get('/api/order',auth, order.getOrders);
    app.put('/api/order',auth, order.create);
    app.get('/api/order/:id',auth, order.getOrderById);
    app.post('/api/order/:id',auth, order.completeOrder);
};