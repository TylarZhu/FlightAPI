const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/face2face";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error!'));

module.exports = db;