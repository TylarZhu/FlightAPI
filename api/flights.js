const router = require("express").Router();
const tickets = require("../db/ticket");
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

        let ticketsInRange = getDateRange(startDate, endDate);
        let result = [];

        result["dates"] = [];

        for(let i = startDate; i <= endDate; i.setDate(i.getDate() + 1)){
            let flights = [];
            let occupiedSeats = [];
            for(let j = 0; j < ticketsInRange.length && ticketsInRange[j].flightDate <= i; j ++) {
                if(ticketsInRange[j] === i) {
                    let sameFlight = false;
                    let k = j, revenue = 0;
                    for(; k < (ticketsInRange.length - 1); k ++) {
                        if(ticketsInRange[k].flightNumber === ticketsInRange[k + 1].flightNumber) {
                            sameFlight = true;
                            occupiedSeats.push(ticketsInRange[k].seatNumber);
                        }
                    }
                    if(sameFlight) {
                        occupiedSeats.push(ticketsInRange[k + 1].seatNumber);
                    }
                    flights.push({flightNumber: ticketsInRange[j].flightNumber, revenue: ticketsInRange[j].ticketCost});
                } else {

                }
            }
        }



        res.json({"status": "success"});
    } catch (err) {
        next(err);
    }
});

module.exports = router;