const Device = require("../models/device.model");

exports.validate = async (req, res, next) => {
    try {
        // parse login and password from headers
        const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
        const [serialNumber, activateKey] = Buffer.from(b64auth, "base64")
            .toString()
            .split(":");

        // Verify login and password are set and correct
        if (serialNumber && activateKey) {

            let findDevice = await Device.findOne({
                serialNumber: serialNumber,
                activateKey: activateKey,
            });

            if (findDevice) {
                req.session = { _id: findDevice._id };
                return next();
            }
        } 

        res.status(403).json({
                message: "Request not allowed!",
            });
    } catch (error) {
        res.status(500).json({
            message: "Internal error!",
        });
    }
};
