'use strict';

module.exports = function(app) {
    
    // Home route
    var giftList = require('../controllers/giftList');
    app.get('/api/order/:id/giftList', giftList.getGiftLists);
    app.put('/api/order/:id/giftList', giftList.create);
    app.get('/api/order/:id/giftList/:id', giftList.getGiftListById);
};