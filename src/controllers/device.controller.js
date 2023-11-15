const Device = require("../models/device.model");
const moment = require("moment");
const common = require("../utils/common");

exports.validate = async (req, res) => {
  try {
    var body = {
      activateKey: req.body.activateKey,
      serialNumber: req.body.serialNumber,
    };

    var device = await Device.findOne(body);

    if (device)
      res.status(200).json({
        message: "Dispositivo encontrado",
      });
    else
      res.status(403).json({
        message: "Dispositivo não encontrado",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal error!",
    });
  }
};

exports.get = async (req, res) => {
  try {
    var device = await Device.find();

    res.json(device);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal error!",
    });
  }
};

exports.create = async (req, res) => {
  try {
    var body = {
      activateKey: req.body.activateKey,
      name: req.body.name,
    };

    let hasCode = true;

    do {
      let code = common.createCode();

      let findDevice = await Device.findOne({ serialNumber: code });

      if (!findDevice) {
        hasCode = false;
        body.serialNumber = code;
      }
    } while (hasCode);

    const newDevice = new Device(body);

    await newDevice.save();

    res.json({
      serialNumber: newDevice.serialNumber,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal error!",
    });
  }
};

exports.setActivationDate = async (req, res) => {
  try {
    const date = req.body.date.map((date) => moment(date).toDate());

    const device = await Device.findOne(req.session);

    device.activationDates = date;

    device.save();

    res.status(200).json(date.map((date) => moment(date).toString()));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal error!",
    });
  }
};

exports.isActive = async (req, res) => {
  try {
    const device = await Device.findOne(req.session);

    device.lastRequest = moment().toDate();

    const activation = device.isActive(moment().valueOf());

    device.save();

    return res.send(activation ? "1" : "0");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal error!",
    });
  }
};

exports.listActivationDate = async (req, res) => {
  try {
    const device = await Device.findOne(req.session);

    res
      .status(200)
      .json(
        device.activationDates.map((date) =>
          moment(date).format("YYYY-MM-DD HH:mm:ss")
        )
      );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal error!",
    });
  }
};

exports.lastRequest = async (req, res) => {
  try {
    const device = await Device.findOne(req.session);

    var diffInMs = {
      ...common.calculateElapsedTime(
        moment(device.lastRequest).toDate(),
        moment().toDate()
      ),
      date: moment(device.lastRequest).format("YYYY-MM-DD HH:mm:ss"),
    };

    res.status(200).json(diffInMs);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal error!",
    });
  }
};

exports.setFeedWeight = async (req, res) => {
  try {
    const device = await Device.findOne(req.session);

    device.lastRequest = moment().toDate();

    device.feedWeight = req.body.weight;

    device.save();

    res.status(200).send("1");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal error!",
    });
  }
};

exports.getFeedWeight = async (req, res) => {
  try {
    const device = await Device.findOne(req.session);

    res.status(200).json({
      feedWeight: device.feedWeight,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal error!",
    });
  }
};
