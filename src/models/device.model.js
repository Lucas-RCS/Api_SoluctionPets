const common = require("../utils/common");
const mongoose = require("mongoose");

class DeviceClass {}

const schema = mongoose.Schema(
  {
    serialNumber: {
      type: String,
      required: true,
      index: {
        unique: true,
      },
    },
    activateKey: {
      type: String,
      required: true,
    },
    activationDates: [Date],
    feedWeight: {
      type: Number,
      require: true,
      default: 0,
    },
    lastRequest: {
      type: Date,
      require: true,
      default: Date.now,
    },
  },
  { collection: "Devices" }
);

schema.loadClass(DeviceClass);

module.exports = mongoose.model("Device", schema);
