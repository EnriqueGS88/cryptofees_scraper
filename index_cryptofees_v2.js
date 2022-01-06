// Get all fees produced per protocol from cryptofees.info

const puppeteer = require('puppeteer');
const { convertArrayToCSV } = require('convert-array-to-csv');
const converter = require('convert-array-to-csv');
const fs = require('fs-extra');
const listOfDates = require('./listOfDates');
const timeoutsValues = require('./timeoutsValues');
require('dotenv').config();
const USERNAME = process.env.USERNAME;

// console.log(USERNAME);

// URLs to scrape
// const cryptofeesURL = `https://cryptofees.info/history/2021-11-02`;
const cryptofeesURL = `https://cryptofees.info/history/`;

const header = ['date', 'protocol', 'daily_fees_usd'];

// Main Async function to scrape both sites

async function getPrices(){

    const browser = await puppeteer.launch(
        
        {   
            headless: false,
            defaultViewport: {
                width: 1400,
                height: 900,
                deviceScaleFactor: 1,
            }
        }

    );

    const page = await browser.newPage();

    await page.setRequestInterception(true);

    page.on('request', (request) => {

        if ( ['image','stylesheet','font'].includes(request.resourceType() ) ) {
            request.abort();
        } else {
            request.continue();
        }
    })

    let historyPrices = [];

    // Loop to get the protocol name and fees from 2 selectors
    // Fist loop to go through all the dates
    for (let i = 0; i<listOfDates.length-1; i++) {

        await page.goto(cryptofeesURL.concat(listOfDates[i]));
        // await page.waitForSelector('div[class="jsx-2013905549 list"]');
        await page.waitForTimeout(timeoutsValues[i]);

        // scrape the top 30 protocols in each date
        let topList = 10;

        // Turn on snippet to create a JSON object to store scraped data
        // let historyObject = {
        //     scrape: []
        // };

        // let createObject = function ( d, p, f ) {
        //     return {
        //         date: d,
        //         protocol: p,
        //         fee: f
        //     }

        // }

        // This loop to go through the top protocols
        for ( let k = 2; k < topList+2 ; k++ ) {
            
            const nameSelector = `#__next > div > main > div.jsx-2013905549.list > a:nth-child(${k}) > div.jsx-166918656.name > div`;
            const feesSelector = `#__next > div > main > div.jsx-2013905549.list > a:nth-child(${k}) > div:nth-child(2)`;

            let date = listOfDates[i];
            let protocol = await page.$eval(nameSelector, element => element.innerText);
            let formatProtocol = protocol.replaceAll(' ', '_').replaceAll('.', '_');
            let fees = await page.$eval(feesSelector, element => element.innerText);
            let formatted_fees = fees.replaceAll(',', '').replace('$', '');
            let fees_usd = formatted_fees.slice(0, (formatted_fees.length-3));

            // Use the following snippet instead to prepare a CSV output

            let subArray = [];
            subArray.push(date);
            subArray.push(formatProtocol);
            subArray.push(fees_usd);            
            historyPrices.push(subArray);
            
            // Use the following snippet to create a JSON object instead
            // let scrapedObject = createObject(date, formatProtocol, fees_usd);
            // historyObject['scrape'].push(scrapedObject);
            // console.log(scrapedObject);
        
        }    

        console.log(historyPrices);

    }

    const csvFromArrayOfArrays = convertArrayToCSV(historyPrices, {
        header,
        separator: ','
    });
    
    async function example(f) {
        try{
            await fs.outputFile(f, csvFromArrayOfArrays);
            const data = await fs.readFile(f, 'utf8');
            // console.log(data);
        } catch (err) {
            console.error(err);
        }
    }

    const scrapeTime = new Date().toLocaleDateString()
    .replaceAll('/', '')
    .replaceAll(':', '')
    .replaceAll(', ', '_');

    let file = `./output/cryptofees_scrape_${scrapeTime}`;
    example(file);

    await browser.close();
    
}

getPrices();
