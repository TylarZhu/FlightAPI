const mongoose = require("mongoose");

let ticket = new mongoose.Schema({
    ticketId: Number,
    flightDate: Date,
    flightNumber: String,
    seatNumber: String,
    ticketCost: Number
});

const Ticket = mongoose.model('Tickets', ticket);

module.exports = Ticket;