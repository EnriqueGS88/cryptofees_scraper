// List all dates between within a range period

const fs = require('fs-extra');

// Function to list all dates till Today in an Array

let getDaysArray = function(start, end) {
    let arr=[];
    for(dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)) {
        arr.push(new Date(dt));
    }
    return arr;
};

// Get today's date in the right format
const today = new Date();
const formatted_today = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()-1;

// Call the function from date in the past to today's date
// Below enter 'formatted_today' to set today's date
let daylist = getDaysArray(new Date("2021-12-01"), new Date("2021-12-31") );

// Convert the format into one accepted by Dates scraper
let daysRange = daylist.map( (v) => v.toISOString().slice(0,10));
console.log("Number of Dates: ", daysRange.length);
let days = daysRange.toString().replaceAll(',','","');

// Convert format into a String that can be saved to a file
let prefix = 'module.exports = ["';
let outputDays = prefix.concat(days, '"]');

// Save output of dates into a JS file as an array
async function example(f) {
    try {
        await fs.outputFile(f, outputDays);
        const data = await fs.readFile(f, 'utf8')
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

let file = './listOfDates.js';
example(file);