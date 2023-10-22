// src/controllers/date-time-controller.js
const dateTimeService = require('../services/dateTimeService');

exports.getDateTime = (req, res) => {
  const date = req.params.date;
  const time = req.params.time;

  try {
    const dateTime = dateTimeService.combineDateAndTime(date, time);
    res.json({ dateTime });
  } catch (error) {
    res.status(400).json({ error: 'Invalid date or time format' });
  }
};
