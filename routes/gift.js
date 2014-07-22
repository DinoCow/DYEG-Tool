'use strict';
var express = require('express');

module.exports = function(app) {
    var auth = express.basicAuth("admin" , "Welcome123");
    // Home route
    var gift = require('../controllers/gift');
    app.get('/api/gift',auth, gift.getGifts);

};
