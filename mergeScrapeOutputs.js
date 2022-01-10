// Merge a series of files by appending them next to each other

// Source: https://stackoverflow.com/questions/3459476/how-to-append-to-a-file-in-node
// Source: https://stackoverflow.com/questions/3459476/how-to-append-to-a-file-in-node/43370201#43370201

const fs = require('fs-extra');
const scrapeData1 = require('./scrapeData.js');
const scrapeData2 = require('./scrapeData2.js');

const stringScrapeData1 = JSON.stringify( scrapeData1 );
const stringScrapeData2 = JSON.stringify( scrapeData2 );

try {
    fs.appendFileSync( './output/mergedOutput.js', stringScrapeData1 );
    fs.appendFileSync( './output/mergedOutput.js', stringScrapeData2 );
    console.log( 'data appended' );   
} catch (e) {
    console.error(e)
}