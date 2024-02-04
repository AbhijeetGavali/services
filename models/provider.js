const mongooes = require("mongoose");

const ProviderSchema = new mongooes.Schema({
  userId: { type: mongooes.Types.ObjectId, required: true },
  serviceId: { type: mongooes.Types.ObjectId, required: true },
  location: { type: String },
});

const Provider = mongooes.model("Provider", ProviderSchema);

module.exports = Provider;
