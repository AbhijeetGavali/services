const validater = require("../helpers/validater.js");
const Service = require("../models/services.js");
const Provider = require("../models/provider.js");
const db = require("mongodb");

const controller = {};

controller.createService = async (req, res) => {
  try {
    const data = { ...req.body };

    // validating inputs
    const errorMessages = validater([
      { type: "text", value: data.name, field: "name" },
    ]);

    // if error in sign in return bad request
    if (errorMessages.length > 0) {
      return res.status(400).json({ code: 0, msg: errorMessages });
    }

    const service = new Service({ name: data.name });

    service.save();

    return res
      .status(200)
      .json({ code: 1, msg: "Service created successfully" });
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ code: 0, msg: "Internal Server Error" });
  }
};

controller.allServices = async (req, res) => {
  try {
    const services = await Service.aggregate([
      {
        $lookup: {
          from: "providers",
          localField: "_id",
          foreignField: "serviceId",
          as: "result",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          providerCount: {
            $size: "$result",
          },
        },
      },
    ]);

    return res.status(200).json({ code: 1, result: services });
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ code: 0, msg: "Internal Server Error" });
  }
};

controller.getServiceProviders = async (req, res) => {
  try {
    const providers = await Provider.aggregate([
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
          serviceId: new db.ObjectId(req.params.id),
        },
      },
      {
        $project: {
          "user.password": 0,
        },
      },
    ]);

    return res.status(200).json({ code: 1, result: providers });
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ code: 0, msg: "Internal Server Error" });
  }
};

module.exports = controller;
