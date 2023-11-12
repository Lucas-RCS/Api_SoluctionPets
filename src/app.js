// src/app.js
require('dotenv').config()
const express = require('express');
const app = express();

// DataBase
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
global.db = mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST_URL}/${process.env.MONGO_DB}?retryWrites=true&w=majority`
);

// Use
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

// Router
const device = require('./routes/device.routers');

app.use('/device', device);

// Start System
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
