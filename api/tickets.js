const router = require("express").Router();
const tickets = require("../db/ticket");
const bodyParser = require('body-parser');
const {quickSort, getDateRange, convertDate} = require("./helpFuntions");

const ticketsDB = require("../db/models");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/", async (req, res, next) => {
    try {
        let {ticketId, flightDate, flightNumber, seatNumber, ticketCost} = req.body.event;
        if(!ticketId || !flightDate || !flightNumber || !seatNumber || !ticketCost) {
            return res.status(400).json({"status": "failed", "reason": "wrong format"});
        }

        // flightDate = req.body.event.flightDate = convertDate(flightDate);

        // if(!binarySearchId(req.body.event, 0 , tickets.length - 1)) {
        //     let result = getDateRange(flightDate, flightDate);
            
        //     for(let i = 0; i < result.length; i ++) {
        //         if(result[i].flightDate.getTime() === flightDate.getTime() &&
        //             result[i].flightNumber === flightNumber && 
        //             result[i].seatNumber === seatNumber){
        //             return res.status(400).json({"status": "failed", "reason": "seatNumber already taken"}); 
        //         }
        //     }

        //     tickets.push(req.body.event);
        //     quickSort(0, tickets.length - 1);

        
            // console.log(tickets);
        } else {
            return res.status(400).json({"status": "failed", "reason": "ticketId already exists"});
        }
        res.json({"status": "success"});
    } catch (err) {
        next(err);
    }
});



let binarySearchId = (obj, start, end) => {
    if(start > end) return false;
    let mid = Math.floor((start + end) / 2);
    if(tickets[mid].ticketId === obj.ticketId) return true;
    if(tickets[mid].flightDate > obj.flightDate)
        return binarySearchId(obj, start, mid - 1);
    else
        return binarySearchId(obj, mid + 1, end);
}
module.exports = router;