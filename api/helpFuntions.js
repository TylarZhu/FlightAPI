
const tickets = require("../db/ticket");

function partition(start, end){
    // Taking the last element as the pivot
    const pivotValue = tickets[end];
    let pivotIndex = start; 
    for (let i = start; i < end; i++) {
        if (tickets[i].flightDate < pivotValue.flightDate) {
        // Swapping elements
        [tickets[i], tickets[pivotIndex]] = [tickets[pivotIndex], tickets[i]];
        // Moving to next element
        pivotIndex++;
        }
    }
    
    // Putting the pivot value in the middle
    [tickets[pivotIndex], tickets[end]] = [tickets[end], tickets[pivotIndex]] 
    return pivotIndex;
};

function quickSort(start, end) {
    // Base case or terminating case
    if (start >= end) {
        return;
    }
    
    // Returns pivotIndex
    let index = partition(start, end);
    
    // Recursively apply the same logic to the left and right subarrays
    quickSort(start, index - 1);
    quickSort(index + 1, end);
}

const getDateRange = (start, end) => {
    let i = 0, j = tickets.length - 1;
    let iflag = false, jflag = false;
    while(i <= j && (!iflag || !jflag)) {
        tickets[i].flightDate < start ? i ++ : iflag = true;
        tickets[j].flightDate > end ? j -- : jflag = true;
    }
    // console.log({start:i, end:j});
    let result = tickets.slice(i, j + 1);
    // console.log("getDateRange: ");
    // console.log(result); 
    return result;
}

const convertDate = (flightDate) => {
    let demoDate = flightDate.replace(/-/g, '');
    const year = demoDate.substring(0, 4);
    const month = demoDate.substring(4, 6);
    const day = demoDate.substring(6, 8);
    const date = new Date(year, month - 1, day);
    return date;
}

module.exports = {quickSort, getDateRange, convertDate};