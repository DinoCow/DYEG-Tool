'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrderSchema = new Schema({
    info: { type: String, default: '', trim: true },
    occasion: { type: String, default: '', trim: true }, 
    dueDate: String,
    dateCreated: { type: Date, default: Date.now },
    giftLists: { type: [ Schema.Types.ObjectId ], default:[]},
    giftPurchased: { type: [ Schema.Types.ObjectId ], default:[] },
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
    status: {type: String, default: "In-Progress"}
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