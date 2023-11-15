const router = require("express").Router();

// Controller
const deviceController = require("../controllers/device.controller");

// Middlewares
const deviceAccess = require("../middlewares/device.access.middleware");


router.get("/validate", deviceController.validate);
router.get("/", deviceController.get);
router.post("/", deviceController.create);

router.post(
  "/set_activation",
  deviceAccess.validate,
  deviceController.setActivationDate
);
router.get(
  "/list_activation",
  deviceAccess.validate,
  deviceController.listActivationDate
);

router.get("/is_active", deviceAccess.validate, deviceController.isActive);

router.get(
  "/last_resquest",
  deviceAccess.validate,
  deviceController.lastRequest
);

router.put(
  "/feed_weight",
  deviceAccess.validate,
  deviceController.setFeedWeight
);
router.get(
  "/feed_weight",
  deviceAccess.validate,
  deviceController.getFeedWeight
); 

module.exports = router;
