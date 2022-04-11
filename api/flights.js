const router = require("express").Router();
// const tickets = require("../db/ticket");
const ticket = require("../db/models");
const bodyParser = require('body-parser');
const {convertDate, getDateRange} = require("./helpFuntions");


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/", (req, res, next) => {
    try {   
        let {startDate, endDate} = req.query;
        if(!startDate) {
            return res.status(400).json({"status": "failed", "reason": "startDate is empty"});
        }
        if(!endDate) {
            return res.status(400).json({"status": "failed", "reason": "endDate is empty"});
        }

        let re = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

        if(!startDate.match(re)) {
            return res.status(400).json({"status": "failed", "reason": "startDate format is invalid"});
        }
        if(!endDate.match(re)) {
            return res.status(400).json({"status": "failed", "reason": "endDate format is invalid"});
        }

        startDate = convertDate(startDate);
        endDate = convertDate(endDate);
        if(startDate > endDate) {
            return res.status(400).json({"status": "failed", "reason": "endDate cannot be before startDate"});
        }

        let result = [];
        ticket.find({flightDate: {
            $gte: new Date(startDate), 
            $lte: new Date(endDate)
        }}, ["ticketId", "flightDate", "flightNumber", "seatNumber", "ticketCost"], 
        {sort: {flightDate: 1}}, 
        (err, data) => {
            if(err) return res.status(400).json({err: err});
            for(let i = startDate; i <= endDate; i.setDate(i.getDate() + 1)) { 
                let flights = [];
                for(let j = 0; j < data.length; j ++) {
                    if(data[j].flightDate.getTime() === i.getTime()) {
                        let occupiedSeats = [];
                        let total = data[j].ticketCost;
                        let sameFlight = false;
                        let k = j + 1;
                        occupiedSeats.push(data[j].seatNumber);

                        for(; k < data.length ; k ++) {
                            if(data[j].flightDate.getTime() === data[k].flightDate.getTime() &&
                                data[j].flightNumber === data[k].flightNumber) {
                                total += data[k].ticketCost;
                                occupiedSeats.push(data[k].seatNumber);
                                sameFlight = true;
                            }
                        }

                        flights.push({flightNumber: data[j].flightNumber, revenue: total, occupiedSeats: occupiedSeats});
                        if(sameFlight) {
                            j = k;
                        }
                    }
                }
                result.push({date: new Date(i), flights: flights});
            }
            res.json({"dates": result});
        });

        // let ticketsInRange = getDateRange(startDate, endDate);
        

        // for(let i = startDate; i <= endDate; i.setDate(i.getDate() + 1)){
        //     let flights = [];
            
        //     for(let j = 0; j < ticketsInRange.length; j ++) {
        //         if(ticketsInRange[j].flightDate.getTime() === i.getTime()) {
        //             let occupiedSeats = [];
        //             let total = ticketsInRange[j].ticketCost;
        //             let sameFlight = false;
        //             let k = j + 1;
        //             occupiedSeats.push(ticketsInRange[j].seatNumber);

        //             for(; k < ticketsInRange.length ; k ++) {
        //                 if(ticketsInRange[j].flightDate.getTime() === ticketsInRange[k].flightDate.getTime() &&
        //                     ticketsInRange[j].flightNumber === ticketsInRange[k].flightNumber) {
        //                     total += ticketsInRange[k].ticketCost;
        //                     occupiedSeats.push(ticketsInRange[k].seatNumber);
        //                     sameFlight = true;
        //                 }
        //             }

        //             flights.push({flightNumber: ticketsInRange[j].flightNumber, revenue: total, occupiedSeats: occupiedSeats});
        //             if(sameFlight) {
        //                 j = k;
        //             }
        //         }
        //     }
        //     result.push({date: new Date(i), flights: flights});
        // }
        // res.json({"dates": result});
    } catch (err) {
        next(err);
    }
});

module.exports = router;