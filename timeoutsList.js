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

// Convert format into a String that can be saved to a file
let prefix = 'module.exports = [';
let timeoutsValues = prefix.concat(timeoutsMap, ']');

// Save output of dates into a JS file as an array
async function example(f) {
    try {
        await fs.outputFile(f, timeoutsValues);
        const data = await fs.readFile(f, 'utf8')
        console.log("List of timeouts saved in root directory");
    } catch (err) {
        console.error(err);
    }
}

let file = './timeoutsValues.js';
example(file);