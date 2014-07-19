'use strict';

module.exports = function(app) {
    
    // Home route
    var gift = require('../controllers/gift');
    app.get('/gift', gift.getByID);
    app.put('/gift', gift.create);

};
