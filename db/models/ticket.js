const mongoose = require("mongoose");

let ticket = new mongoose.Schema({
    ticketId: Number,
    flightDate: Date,
    flightNumber: Number,
    seatNumber: Number,
    ticketCost: Number
});

let Ticket = mongoose.model('Users', ticket);

Ticket.findInRange = (startDate, endDate) => {
    Ticket.find({
        flightDate: {
            $gte: new Date(startDate), 
            $lt: new Date(endDate)
        }
    }, (err, doc) => {
        if(err) return {err: err};
        return doc;
    });

}

module.exports = Ticket;