// Get all fees produced per protocol from cryptofees.info

const puppeteer = require('puppeteer');
const { convertArrayToCSV } = require('convert-array-to-csv');
const converter = require('convert-array-to-csv');
const fs = require('fs-extra');
const listOfDates = require('./listOfDates');
const timeoutsValues = require('./timeoutsValues');
require('dotenv').config();
const USERNAME = process.env.USERNAME;

console.log(USERNAME);

// URLs to scrape
const cryptofeesURL = `https://cryptofees.info/history/`;

const header = ['date', 'protocol', 'daily_fees_usd'];

// Main Async function to scrape both sites

async function getPrices(){

    const browser = await puppeteer.launch(
        
        {   
            headless: true,
            defaultViewport: {
                width: 1400,
                height: 900,
                deviceScaleFactor: 1,
            }
        }

    );

    let historyPrices = [];

    const page = await browser.newPage();

    await page.setRequestInterception(true);

    page.on('request', (request) => {

        if ( ['image','stylesheet','font'].includes(request.resourceType() ) ) {
            request.abort();
        } else {
            request.continue();
        }
    })

// ****
// Use batch and batch size to define which dates should be scraped
// The batched dates come from the file listOfDates.js
//****

    const batch = 0;
    const batchSize = 8;

    const getDates = function (b, s) {
        let dates = listOfDates.slice( (b*s) , (b*s)+s );
        return dates;
    };

    const batchDates = getDates(batch, batchSize);

    console.log("Running batch ",batch+1,"/",listOfDates.length/batchSize);
        
    // Fist loop to go through all the dates
    for (let i = 0; i < batchDates.length; i++) {
        
        await page.goto(cryptofeesURL.concat(batchDates[i]));
        // await page.waitForSelector('div[class="jsx-2013905549 list"]');
        await page.waitForTimeout(timeoutsValues[i]);
        
        // scrape the top 10 protocols in each date
        let topList = 30;
        
            // Loop to get the protocol name and fees from 2 selectors
            // This loop to go through the top protocols
            for (let k = 2; k < topList+2 ; k++ ) {
                
                const nameSelector = `#__next > div > main > div.jsx-2013905549.list > a:nth-child(${k}) > div.jsx-166918656.name > div`;
                const feesSelector = `#__next > div > main > div.jsx-2013905549.list > a:nth-child(${k}) > div:nth-child(2)`;

                let date = batchDates[i];
                let protocol = await page.$eval(nameSelector, element => element.innerText);
                let fees = await page.$eval(feesSelector, element => element.innerText);
                let formatted_fees = fees.replaceAll(',', '').replace('$', '');
                let fees_usd = formatted_fees.slice(0, (formatted_fees.length-3));
                let subArray = [];
                              
                subArray.push(date);
                subArray.push(protocol);
                subArray.push(fees_usd);
                
                historyPrices.push(subArray);
                        
            }

    }

    const csvFromArrayOfArrays = convertArrayToCSV(historyPrices, {
        header,
        separator: ','
    });
    
    async function example(f) {
        try{
            await fs.outputFile(f, csvFromArrayOfArrays);
            const data = await fs.readFile(f, 'utf8');
            console.log(`Saved Fees data for ${batchDates[0]} - ${batchDates[batchSize-1]}`);
        } catch (err) {
            console.error(err);
        }
    }
    
    const scrapeTime = new Date().toLocaleString()
    .replaceAll('/', '')
    .replaceAll(':', '')
    .replaceAll(', ', '_');
    
    let file = `./output/cryptofees_${scrapeTime}_${batchDates[0]}`;
    example(file);
    
    await page.close();
    
    await browser.close();
    
}

getPrices();
