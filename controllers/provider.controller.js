const Service = require("../models/services.js");
const Provider = require("../models/provider.js");
const db = require("mongodb");
const Booking = require("../models/booking.js");
const validater = require("../helpers/validater.js");
const { convertToInitialTime } = require("../helpers/bookings.js");

const controller = {};

controller.getPRovidersById = async (req, res) => {
  try {
    const services = await Provider.aggregate([
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
        $match: {
          _id: new db.ObjectId(req.params.id),
        },
      },
      {
        $project: {
          "user.password": 0,
        },
      },
    ]);

    return res.status(200).json({ code: 1, result: services[0] });
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ code: 0, msg: "Internal Server Error" });
  }
};

controller.addBooking = async (req, res) => {
  try {
    const data = {
      providerId: req.params.id,
      userId: req.user.id,
      ...req.body,
    };

    const dataToCheck = [
      { type: "string", value: data.providerId },
      { type: "string", value: data.userId },
    ];

    const errorMessages = validater(dataToCheck);

    // if error in sign in return bad request
    if (errorMessages.length > 0) {
      return res.status(400).json({ code: 0, msg: errorMessages });
    }

    const available = await Booking.findOne({
      providerId: data.providerId,
      booking_date: data.booking_date,
      time_slot: data.time_slot,
    });
    if (!available) {
      const services = await Booking.create(data);

      return res
        .status(200)
        .json({ code: 1, result: "Appointment booked successfully" });
    }
    return res.status(400).json({
      code: 0,
      result: "Slot time not available. Choose another date or slot",
    });
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ code: 0, msg: "Internal Server Error" });
  }
};

controller.approveBooking = async (req, res) => {
  try {
    const data = {
      bookingId: req.params.id,
      userId: req.user.id,
      ...req.body,
    };

    const dataToCheck = [
      { type: "string", value: data.providerId },
      { type: "string", value: data.userId },
    ];

    const errorMessages = validater(dataToCheck);

    // if error in sign in return bad request
    if (errorMessages.length > 0) {
      return res.status(400).json({ code: 0, msg: errorMessages });
    }

    const booking = await Booking.findById(data.bookingId);

    if (booking) {
      booking.aproved = 1;
      booking.save();

      return res
        .status(200)
        .json({ code: 1, result: "Appointment aproved successfully" });
    }
    return res.status(400).json({
      code: 0,
      result: "Booking not available.",
    });
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ code: 0, msg: "Internal Server Error" });
  }
};

controller.rejectBooking = async (req, res) => {
  try {
    const data = {
      bookingId: req.params.id,
      userId: req.user.id,
      ...req.body,
    };

    const dataToCheck = [
      { type: "string", value: data.providerId },
      { type: "string", value: data.userId },
    ];

    const errorMessages = validater(dataToCheck);

    // if error in sign in return bad request
    if (errorMessages.length > 0) {
      return res.status(400).json({ code: 0, msg: errorMessages });
    }

    const booking = await Booking.findById(data.bookingId);

    if (booking) {
      booking.aproved = -1;
      booking.save();

      return res
        .status(200)
        .json({ code: 1, result: "Appointment aproved successfully" });
    }
    return res.status(400).json({
      code: 0,
      result: "Booking not available.",
    });
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ code: 0, msg: "Internal Server Error" });
  }
};

controller.getPRovidersByCity = async (req, res) => {
  try {
    const services = await await Provider.aggregate([
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
        $match: {
          location: req.params.city,
        },
      },
      {
        $project: {
          "user.password": 0,
        },
      },
    ]);

    return res.status(200).json({ code: 1, result: services });
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ code: 0, msg: "Internal Server Error" });
  }
};

controller.getProvidersByName = async (req, res) => {
  try {
    const services = await await Provider.aggregate([
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
        $match: {
          "user.firstName": {
            $regex: ".*" + req.query.name + ".*",
            $options: "i",
          },
        },
      },
      {
        $project: {
          "user.password": 0,
        },
      },
    ]);

    return res.status(200).json({ code: 1, result: services });
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ code: 0, msg: "Internal Server Error" });
  }
};

controller.getPRovidersSlotsById = async (req, res) => {
  try {
    const services = await await Booking.aggregate([
      {
        $lookup: {
          from: "providers",
          localField: "providerId",
          foreignField: "_id",
          as: "provider",
        },
      },
      {
        $unwind: {
          path: "$provider",
          preserveNullAndEmptyArrays: true,
        },
      },
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
          from: "users",
          localField: "provider.userId",
          foreignField: "_id",
          as: "provider",
        },
      },
      {
        $unwind: {
          path: "$provider",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "services",
          localField: "provider.serviceId",
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
        $match: {
          providerId: new db.ObjectId(req.params.id),
        },
      },
      {
        $project: {
          "user.password": 0,
          providerId: 0,
          userId: 0,
          "provider.password": 0,
        },
      },
    ]);

    return res.status(200).json({ code: 1, result: services });
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ code: 0, msg: "Internal Server Error" });
  }
};

controller.getPRovidersSlotsDetailsById = async (req, res) => {
  try {
    const services = await await Provider.aggregate([
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
        $match: {
          location: req.params.city,
        },
      },
      {
        $project: {
          "user.password": 0,
        },
      },
    ]);

    return res.status(200).json({ code: 1, result: services });
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ code: 0, msg: "Internal Server Error" });
  }
};

controller.updateRating = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);

    return res.status(200).json({ code: 1, result: "updated successfully" });
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ code: 0, msg: "Internal Server Error" });
  }
};

module.exports = controller;
