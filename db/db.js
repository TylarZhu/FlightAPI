const mongoose = require('mongoose');

//mongodb://localhost:27017/DatabaseName for nodeJS < 7.0
const url = "mongodb://127.0.0.1:27017/FlightAPI";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error!'));

module.exports = db;