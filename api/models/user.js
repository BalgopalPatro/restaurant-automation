var mongoose = require("mongoose");

var user = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: "customer"
    }
});
var User = mongoose.model("User", user);

module.exports.model = User;
module.exports.schema = user;
