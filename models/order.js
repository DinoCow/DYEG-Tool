'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrderSchema = new Schema({
    info: { type: String, default: '', trim: true },
    occasion: { type: String, default: '', trim: true }, 
    dueDate: Date,
    dateCreated: { type: Date, default: Date.now },
    giftLists: { type: [ Schema.Types.ObjectId ], default:[]},
    giftPurchased: { type: [ String ], default:[] },
    owner: String,
    gifter: {
        name: String,
        gender: String,
        age: Number
    },
    recipient: {
        gender: String,
        age: Number,
        interests: [String]
    },
    status: {type: String, default: "Defined"}
});

/**
 * Validations
 */
OrderSchema.path('occasion').validate(function(occasion) {
    return occasion;
}, 'occasion cannot be blank');

/**
 * Statics (Sprocs)
 */ 
OrderSchema.statics.findByOwner = function(name, cb){
	this.find({ owner: new RegExp(name, 'i') }, cb);
}

OrderSchema.statics.findByID= function(ID, cb){
	this.findOne({ _id: ID }, cb);
}

module.exports = mongoose.model('Order', OrderSchema);