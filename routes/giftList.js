'use strict';
var express = require('express');

module.exports = function(app) {
    var auth = express.basicAuth("admin" , "Welcome123");
    // Home route
    var giftList = require('../controllers/giftList');
    app.get('/api/order/:id/giftList',auth, giftList.getGiftLists);
    app.put('/api/order/:id/giftList',auth, giftList.create);
    app.get('/api/order/:orderId/giftList/:giftListId',auth, giftList.getGiftListById);
    app.put('/api/giftList/:id/gift',auth, giftList.addGift);
};