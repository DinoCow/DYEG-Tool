'use strict';
var express = require('express');

module.exports = function(app) {
    var auth = express.basicAuth("admin" , "Welcome123");
    // Home route
    var index = require('../controllers/index');
    app.get('/',auth, index.render);

};
