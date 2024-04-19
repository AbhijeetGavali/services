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
  const user = await User.create({ ...data, role: ROLE.PROVIDER });
  await Provider.create({
    service_description: data.service_description,
    payment_mode: data.payment_mode,
    total_customers: data.total_customers,
    rating: data.rating,
    cost: data.cost,
    experience: data.experience,
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

service.updateDetails = async ({ userId, ...details }) => {
  const user = await User.findByIdAndUpdate(userId, details);
  await Provider.findOneAndUpdate({ userId }, details);
  delete user?.password;
  return user;
};

service.approveProviders = async ({ providerId, ...details }) => {
  return await Provider.findByIdAndUpdate(providerId, details);
};

service.deleteUser = async ({ userId }) => {
  const user = await User.findByIdAndDelete(userId);
  await Provider.findOneAndDelete({ userId });
  return user;
};

service.getAllUsers = async () => {
  const user = await User.find(
    { isDeleted: false },
    { isDeleted: 0, password: 0 },
  );
  return user;
};

service.getAllProviders = async () => {
  return await Provider.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: {
        path: "$user",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "services",
        localField: "serviceId",
        foreignField: "_id",
        as: "services",
      },
    },
    {
      $unwind: {
        path: "$services",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        "user.password": 0,
      },
    },
  ]);
};

module.exports = service;
