var mongoose = require("mongoose");

const userSchema = require("./user").schema;

var reservationSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  user: {
    required: false,
    type: userSchema
  }
});
var Reservation = mongoose.model("Reservation", reservationSchema);

module.exports.model = Reservation;
module.exports.schema = reservationSchema;
