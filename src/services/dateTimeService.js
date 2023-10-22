// src/services/date-time-service.js
exports.combineDateAndTime = (date, time) => {
    const combinedDateTime = new Date(`${date}T${time}`);
    if (isNaN(combinedDateTime)) {
      throw new Error('Invalid date or time format');
    }
    return combinedDateTime.toISOString();
  };
  