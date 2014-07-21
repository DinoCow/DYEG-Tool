'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GiftListSchema = new Schema({
    gifts: [ Schema.Types.ObjectId ],
    name: String,
    description: String
});

/**
 * Validations
 */
GiftListSchema.path('name').validate(function(name) {
    return name;
}, 'name cannot be blank');

/**
 * Statics (Sprocs)
 */ 
GiftListSchema.statics.findByName = function(name, cb){
	this.find({ name: new RegExp(name, 'i') }, cb);
}

GiftListSchema.statics.findByID= function(ID, cb){
	this.findOne({ _id: ID }, cb);
}

module.exports = mongoose.model('GiftList', GiftListSchema);