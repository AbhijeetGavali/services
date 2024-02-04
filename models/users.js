const mongooes = require("mongoose");
const { ROLE } = require("../config/roles");

const UserSchema = new mongooes.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  password: { type: String, required: true },
  email: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  role: { type: String, default: ROLE.USER },
});

const User = mongooes.model("User", UserSchema);

module.exports = User;
