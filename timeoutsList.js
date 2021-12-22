// List all dates between within a range period

const fs = require('fs-extra');
const listOfDates = require('./listOfDates');


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const timeoutsMap = listOfDates.map( x => (x.length*getRandomInt(120, 230) ) );

console.log(timeoutsMap);


// const test = getRandomInt(1200, 1500);

// console.log(test);


/*
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
const formatted_today = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

// Call the function from date in the past to today's date
let daylist = getDaysArray(new Date("2021-12-09"), new Date(formatted_today) );

// Convert the format into one accepted by Dates scraper
let daysRange = daylist.map( (v) => v.toISOString().slice(0,10));
let days = daysRange.toString().replaceAll(',','","');
*/








// Convert format into a String that can be saved to a file
let prefix = 'module.exports = [';
let timeoutsValues = prefix.concat(timeoutsMap, ']');

// Save output of dates into a JS file as an array
async function example(f) {
    try {
        await fs.outputFile(f, timeoutsValues);
        const data = await fs.readFile(f, 'utf8')
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

let file = './timeoutsValues.js';
example(file);