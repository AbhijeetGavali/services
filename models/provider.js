const mongooes = require("mongoose");

const ProviderSchema = new mongooes.Schema({
  userId: { type: mongooes.Types.ObjectId, required: true },
  serviceId: { type: mongooes.Types.ObjectId, required: true },
  service_description: { type: String, default: "" },
  payment_mode: { type: String, default: "" },
  total_customers: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  cost: { type: Number, default: 200 },
  location: { type: String },
  experience: { type: Number, default: 0 },
});

const Provider = mongooes.model("Provider", ProviderSchema);

module.exports = Provider;
