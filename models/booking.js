const mongooes = require("mongoose");

const BookingSchema = new mongooes.Schema({
  providerId: { type: mongooes.Types.ObjectId, required: true },
  userId: { type: mongooes.Types.ObjectId, required: true },
  booking_date: { type: String },
  time_slot: { type: String },
  address: { type: String },
  state: { type: String },
  pincode: { type: String },
  aproved: { type: Boolean, default: false },
  otp_aproved: { type: Boolean, default: false },
});

const Booking = mongooes.model("Booking", BookingSchema);

module.exports = Booking;
