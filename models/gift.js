'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GiftSchema = new Schema({
	ASIN: String
});

/**
 * Validations
 */
GiftSchema.path('ASIN').validate(function(asin) {
    return asin;
}, 'ASIN cannot be blank');

/**
 * Statics (Sprocs)
 */ 
GiftSchema.statics.findByASIN = function(asin, cb){
	this.find({ ASIN: new RegExp(asin, 'i') }, cb);
}

GiftSchema.statics.findByID= function(ID, cb){
	this.findOne({ _id: ID }, cb);
}

module.exports = mongoose.model('Gift', GiftSchema);