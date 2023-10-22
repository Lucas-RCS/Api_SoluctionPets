// src/app.js
const express = require('express');
const app = express();

app.use(express.json());

const dateTimeRoute = require('./routes/routes');
app.use('/api/date-time', dateTimeRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
