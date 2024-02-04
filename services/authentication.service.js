const User = require("../models/users");

const service = {};

service.getUser = async (email) => {
  const user = await User.findOne({ email: email, isDeleted: false });
  return user;
};

service.createUser = async (data) => {
  const user = await User.create(data);
  return user;
};

service.updatePassword = async ({ userId, password }) => {
  const user = await User.findByIdAndUpdate(userId, { password });
  delete user?.password;
  return user;
};

module.exports = service;
