var mongoose = require("mongoose");

const userSchema = require('./user').schema

var orderSchema = new mongoose.Schema({
    time: {
        type : Date,
        default : Date.now
    },
    name: String,
    user: {
        required: true,
        type: userSchema
    },
    address: {
        required: true,
        type: {
            phone: Number,
            address1: String,
            address2: String,
            zip: Number,
        }
    },
    items: [Number],
    delevered: Boolean,
    prepared: Boolean,
});
var Order = mongoose.model("Order", orderSchema);

module.exports.model = Order;
module.exports.schema = orderSchema;
