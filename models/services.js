const mongooes = require("mongoose");

const ServiceSchema = new mongooes.Schema({
  name: { type: String, required: true },
});

const Service = mongooes.model("Service", ServiceSchema);

module.exports = Service;
