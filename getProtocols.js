// Get all protocols from Scrape Data without Duplicates
// Store an array in listOfProtocols.js

const scrapeData = require('./output/cryptofees_scrape_10012022')

let getProtocols = [];

scrapeData.forEach( (day) => {
    if ( getProtocols.indexOf( day[1] ) >= 0 ) {      
    } else {
        getProtocols.push( day[1] );
    }
})

console.log( getProtocols );