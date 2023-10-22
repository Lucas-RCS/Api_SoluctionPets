// src/routes/date-time.js
const express = require('express');
const router = express.Router();
const dateTimeController = require('../controllers/dateTimeController');

router.get('/:date/:time', dateTimeController.getDateTime);

module.exports = router;
