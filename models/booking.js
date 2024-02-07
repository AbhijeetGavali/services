const mongooes = require("mongoose");

const BookingSchema = new mongooes.Schema({
  providerId: { type: mongooes.Types.ObjectId, required: true },
  userId: { type: mongooes.Types.ObjectId, required: true },
  bookingSlot: { type: Date, required: true },
});

const Booking = mongooes.model("Booking", BookingSchema);

module.exports = Booking;
