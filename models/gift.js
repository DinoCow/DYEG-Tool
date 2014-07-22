'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GiftSchema = new Schema({
	name:String,
	asin: String,
	url: String,
	thumbnail: String,
	price: String
});

/**
 * Validations
 */
GiftSchema.path('asin').validate(function(asin) {
    return asin;
}, 'ASIN cannot be blank');

/**
 * Statics (Sprocs)
 */ 
GiftSchema.statics.findByASIN = function(asin, cb){
	this.find({ asin: new RegExp(asin, 'i') }, cb);
}

GiftSchema.statics.findByID= function(id, cb){
	this.findOne({ _id: id }, cb);
}

module.exports = mongoose.model('Gift', GiftSchema);