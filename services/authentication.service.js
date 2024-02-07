const { ROLE } = require("../config/roles");
const Provider = require("../models/provider");
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

service.createProvider = async (data) => {
  const user = await User.create({ ...data, ROLE: ROLE.PROVIDER });
  await Provider.create({
    service_description: data.service_description,
    payment_mode: data.payment_mode,
    total_customers: data.total_customers,
    rating: data.rating,
    cost: data.cost,
    location: data.location,
    serviceId: data.serviceId,
    userId: user._id,
  });

  return user;
};

service.updatePassword = async ({ userId, password }) => {
  const user = await User.findByIdAndUpdate(userId, { password });
  delete user?.password;
  return user;
};

module.exports = service;
