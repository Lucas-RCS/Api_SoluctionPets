const common = require("../utils/common");
const mongoose = require("mongoose");
const moment = require("moment");

class DeviceClass {
  
  isActive(specificDate = moment().valueOf()) {
    const lastActivationDate =
      this.lastActivationDate == undefined
        ? 0
        : moment(this.lastActivationDate).valueOf();

    const gap = 5 * 60 * 1000;

    let minSpecificDate = specificDate - gap;
    let maxSpecificDate = specificDate + gap;

    let activation = false;

    for (let i = 0; i < this.activationDates.length; i++) {
      let date = moment(this.activationDates[i]).valueOf();

      if (lastActivationDate != date)
        if (
          (minSpecificDate < date && maxSpecificDate > date) ||
          (minSpecificDate == date && maxSpecificDate == date)
        ) {
          this.lastActivationDate = this.activationDates[i];
          activation = true;
          break;
        }
    }

    return activation;
  }
}

const schema = mongoose.Schema(
  {
    name:{
      type: String,
      required: true,
    },
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
    lastActivationDate: Date,
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
