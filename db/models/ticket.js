const mongoose = require("mongoose");

let ticket = new mongoose.Schema({
    ticketId: Number,
    flightDate: Date,
    flightNumber: String,
    seatNumber: String,
    ticketCost: Number
});

let Ticket = mongoose.model('Tickets', ticket);

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

Ticket.findByTicketId = (ticketId) => {
    return Ticket.findOne({ticketId: ticketId}, (err) => {
        if(err) return console.log(err);
    });
}

module.exports = Ticket;