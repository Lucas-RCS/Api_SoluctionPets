const Device = require("../models/device.model");
const common = require("../utils/common");

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
    var body = req.body;

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
    console.log(error);
    res.status(500).json({
      message: "Internal error!",
    });
  }
};

exports.setActivationDate = async (req, res) => {
  try {
    const date = req.body.date.map((date) => new Date(date));

    const device = await Device.findOne(req.session);

    device.activationDates = date;

    device.save();

    res.status(200).json({});
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

    device.lastRequest = new Date();

      device.save();

    dateArray = device.activationDates;
    const gap = 5 * 60 * 1000;

    const specificDate = new Date().getTime();
    let minSpecificDate = specificDate - gap;
    let maxSpecificDate = specificDate + gap;

    for (let i = 0; i < dateArray.length; i++) {
      let date = new Date(dateArray[i]).getTime();

      if (
        (minSpecificDate < date && maxSpecificDate > date) ||
        (minSpecificDate == date && maxSpecificDate == date)
      ) {
        console.log("olas");
        res.send("1");
      }
    }

    res.send("0");
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

    res.status(200).json(device.activationDates);
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

      res
        .status(200)
        .json(common.calculateElapsedTime(device.lastRequest, req.query.date));
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal error!",
      });
    }
};
