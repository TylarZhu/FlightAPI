const mongoose = require("mongoose");

let ticket = new mongoose.Schema({
    ticketId: Number,
    flightDate: Date,
    flightNumber: String,
    seatNumber: String,
    ticketCost: Number
});

const Ticket = mongoose.model('Tickets', ticket);

Ticket.findInRange = (startDate, endDate) => {
    return Ticket.find({
        flightDate: {
            $gte: new Date(startDate), 
            $lte: new Date(endDate)
        }
    }, (err, doc) => {
        if(err) return {err: err};
        return doc;
    });

}

module.exports = Ticket;