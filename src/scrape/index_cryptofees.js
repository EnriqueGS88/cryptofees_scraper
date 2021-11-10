// Get All Decentraland LAND NFTs from nftfi.com and pass them to NFT Bank Estimates
// Use NFT Bank estimates to calculate loans

const puppeteer = require('puppeteer');
const convertMana = require('./convertMana');
const convertUSD = require('./convertUSD');
const loanProposal = require('./loanProposal');

// URLs to scrape
const cryptofees = `https://cryptofees.info/history/`;
//const nftBank = 'https://nftbank.ai/estimates';

// const dates = ['2021-11-02','2021-11-01','2021-10-31'];

const dates = ["2021-07-03","2021-07-04","2021-07-05","2021-07-06","2021-07-07","2021-07-08","2021-07-09","2021-07-10","2021-07-11","2021-07-12","2021-07-13","2021-07-14","2021-07-15","2021-07-16","2021-07-17","2021-07-18","2021-07-19","2021-07-20","2021-07-21","2021-07-22","2021-07-23","2021-07-24","2021-07-25","2021-07-26","2021-07-27","2021-07-28","2021-07-29","2021-07-30","2021-07-31","2021-08-01","2021-08-02","2021-08-03","2021-08-04","2021-08-05","2021-08-06","2021-08-07","2021-08-08","2021-08-09","2021-08-10","2021-08-11","2021-08-12","2021-08-13","2021-08-14","2021-08-15","2021-08-16","2021-08-17","2021-08-18","2021-08-19","2021-08-20","2021-08-21","2021-08-22","2021-08-23","2021-08-24","2021-08-25","2021-08-26","2021-08-27","2021-08-28","2021-08-29","2021-08-30","2021-08-31","2021-09-01","2021-09-02","2021-09-03","2021-09-04","2021-09-05","2021-09-06","2021-09-07","2021-09-08","2021-09-09","2021-09-10","2021-09-11","2021-09-12","2021-09-13","2021-09-14","2021-09-15","2021-09-16","2021-09-17","2021-09-18","2021-09-19","2021-09-20","2021-09-21","2021-09-22","2021-09-23","2021-09-24","2021-09-25","2021-09-26","2021-09-27","2021-09-28","2021-09-29","2021-09-30","2021-10-01","2021-10-02","2021-10-03","2021-10-04","2021-10-05","2021-10-06","2021-10-07","2021-10-08","2021-10-09","2021-10-10","2021-10-11","2021-10-12","2021-10-13","2021-10-14","2021-10-15","2021-10-16","2021-10-17","2021-10-18","2021-10-19","2021-10-20","2021-10-21","2021-10-22","2021-10-23","2021-10-24","2021-10-25","2021-10-26","2021-10-27","2021-10-28","2021-10-29","2021-10-30","2021-10-31","2021-11-01","2021-11-02"];


// Convert functions to handle the API responses within Puppeteer browser

let currentNftID = () => {

    return nftIDs[nftIDs.length-1];

}

let nftIDs = []; // use it to store the cryptofees ID being queried in For loop in NFT Bank scraper


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

    let dataset = [];

    for( let i=0; i<dates.length; i++) {
        


    await page.goto(`https://cryptofees.info/history/${dates[i]}`);



    await page.waitForSelector('div[class="jsx-2013905549 list"]');
 
    //debugger;

    /*

    let parcelID = []; // use it to parse the Decentraland LAND NFTs in nftfi.com scraper

    let nodeList = await page.$$('ul[class="assets"]>li');

    for(let node of nodeList) {

        let href = await node.$eval('a[class="asset__link"]', element => element.getAttribute('href'));
        let index = href.lastIndexOf('/');
        let value = href.slice(index+1);
        
        parcelID.push(value);

    }
    console.log(parcelID);

    */


    let historyPrices = [];


        
        let price2 = await page.evaluate( async (i) => {
            //Selectors
            const nameSelector = `#__next > div > main > div.jsx-2013905549.list > a:nth-child(2) > div.jsx-166918656.name > div`;
            const feesSelector = `#__next > div > main > div.jsx-2013905549.list > a:nth-child(2) > div:nth-child(2)`;
            
            //const sushiSelector = 'div[class="estimatePrice"]';
            
            let getInnerText = selector =>{
                return document.querySelector(selector) ? document.querySelector(selector).innerText : false;
            }
            
            
            return{
                name: await getInnerText(nameSelector),
                dayFees: await getInnerText(feesSelector)
            }
            
            
        } );
        
        historyPrices.push(price2);

        let price3 = await page.evaluate( async (i) => {
            //Selectors
            const nameSelector = `#__next > div > main > div.jsx-2013905549.list > a:nth-child(3) > div.jsx-166918656.name > div`;
            const feesSelector = `#__next > div > main > div.jsx-2013905549.list > a:nth-child(3) > div:nth-child(2)`;
            
            //const sushiSelector = 'div[class="estimatePrice"]';
            
            let getInnerText = selector =>{
                return document.querySelector(selector) ? document.querySelector(selector).innerText : false;
            }
            
            
            return{
                name: await getInnerText(nameSelector),
                dayFees: await getInnerText(feesSelector)
            }
            
            
        } );
        
        historyPrices.push(price3);


        let price4 = await page.evaluate( async (i) => {
            //Selectors
            const nameSelector = `#__next > div > main > div.jsx-2013905549.list > a:nth-child(4) > div.jsx-166918656.name > div`;
            const feesSelector = `#__next > div > main > div.jsx-2013905549.list > a:nth-child(4) > div:nth-child(2)`;
            
            //const sushiSelector = 'div[class="estimatePrice"]';
            
            let getInnerText = selector =>{
                return document.querySelector(selector) ? document.querySelector(selector).innerText : false;
            }
            
            
            return{
                name: await getInnerText(nameSelector),
                dayFees: await getInnerText(feesSelector)
            }
            
            
        } );
        
        historyPrices.push(price4);


        let price5 = await page.evaluate( async (i) => {
            //Selectors
            const nameSelector = `#__next > div > main > div.jsx-2013905549.list > a:nth-child(5) > div.jsx-166918656.name > div`;
            const feesSelector = `#__next > div > main > div.jsx-2013905549.list > a:nth-child(5) > div:nth-child(2)`;
            
            //const sushiSelector = 'div[class="estimatePrice"]';
            
            let getInnerText = selector =>{
                return document.querySelector(selector) ? document.querySelector(selector).innerText : false;
            }
            
            
            return{
                name: await getInnerText(nameSelector),
                dayFees: await getInnerText(feesSelector)
            }
            
            
        } );
        
        historyPrices.push(price5);


        let price6 = await page.evaluate( async (i) => {
            //Selectors
            const nameSelector = `#__next > div > main > div.jsx-2013905549.list > a:nth-child(6) > div.jsx-166918656.name > div`;
            const feesSelector = `#__next > div > main > div.jsx-2013905549.list > a:nth-child(6) > div:nth-child(2)`;
            
            //const sushiSelector = 'div[class="estimatePrice"]';
            
            let getInnerText = selector =>{
                return document.querySelector(selector) ? document.querySelector(selector).innerText : false;
            }
            
            
            return{
                name: await getInnerText(nameSelector),
                dayFees: await getInnerText(feesSelector)
            }
            
            
        } );
        
        historyPrices.push(price6);
        
        
        let price7 = await page.evaluate( async (i) => {
            //Selectors
            const nameSelector = `#__next > div > main > div.jsx-2013905549.list > a:nth-child(7) > div.jsx-166918656.name > div`;
            const feesSelector = `#__next > div > main > div.jsx-2013905549.list > a:nth-child(7) > div:nth-child(2)`;
            
            //const sushiSelector = 'div[class="estimatePrice"]';
            
            let getInnerText = selector =>{
                return document.querySelector(selector) ? document.querySelector(selector).innerText : false;
            }
            
            
            return{
                name: await getInnerText(nameSelector),
                dayFees: await getInnerText(feesSelector)
            }
            
            
        } );
        
        historyPrices.push(price7);
        
        let price8 = await page.evaluate( async (i) => {
            //Selectors
            const nameSelector = `#__next > div > main > div.jsx-2013905549.list > a:nth-child(8) > div.jsx-166918656.name > div`;
            const feesSelector = `#__next > div > main > div.jsx-2013905549.list > a:nth-child(8) > div:nth-child(2)`;
            
            //const sushiSelector = 'div[class="estimatePrice"]';
            
            let getInnerText = selector =>{
                return document.querySelector(selector) ? document.querySelector(selector).innerText : false;
            }
            
            
            return{
                name: await getInnerText(nameSelector),
                dayFees: await getInnerText(feesSelector)
            }
            
            
        } );
        
        historyPrices.push(price8);
        
        let price9 = await page.evaluate( async (i) => {
            //Selectors
            const nameSelector = `#__next > div > main > div.jsx-2013905549.list > a:nth-child(9) > div.jsx-166918656.name > div`;
            const feesSelector = `#__next > div > main > div.jsx-2013905549.list > a:nth-child(9) > div:nth-child(2)`;
            
            //const sushiSelector = 'div[class="estimatePrice"]';
            
            let getInnerText = selector =>{
                return document.querySelector(selector) ? document.querySelector(selector).innerText : false;
            }
            
            
            return{
                name: await getInnerText(nameSelector),
                dayFees: await getInnerText(feesSelector)
            }
            
            
        } );
        
        historyPrices.push(price9);
        
        let price10 = await page.evaluate( async (i) => {
            //Selectors
            const nameSelector = `#__next > div > main > div.jsx-2013905549.list > a:nth-child(10) > div.jsx-166918656.name > div`;
            const feesSelector = `#__next > div > main > div.jsx-2013905549.list > a:nth-child(10) > div:nth-child(2)`;
            
            //const sushiSelector = 'div[class="estimatePrice"]';
            
            let getInnerText = selector =>{
                return document.querySelector(selector) ? document.querySelector(selector).innerText : false;
            }
            
            
            return{
                name: await getInnerText(nameSelector),
                dayFees: await getInnerText(feesSelector)
            }
            
            
        } );
        
        historyPrices.push(price10);



        
    //console.log(price);
    // console.log("this is the array:", historyPrices);

    dataset.push(historyPrices);

    console.log(`Prices for ${dates[i]}`, historyPrices);

    await page.waitForTimeout(1000)
    
    }

    await browser.close();
    
    /*
    
    // Open a new page to scrape NFT Bank
    const page2 = await browser.newPage();
    
    // Intercept calls that load image, styles and font to improve bot performance
    await page2.setRequestInterception(true);

    page2.on('request', (request) => {

        if ( ['image','stylesheet','font'].includes(request.resourceType() ) ) {
            request.abort();
        } else {
            request.continue();
        }
    })
    

    await page2.goto(nftBank);
        
    // Enter Decentraland LAND (NFT ID) to be searched for in NFT Bank
    await page2.waitForSelector('input[class="MultiSearch__SearchInput-vmef37-4 WKTfL"]');

    
    // Expose the Functions that are outside page2.Evaluate()
    await page2.exposeFunction('convertMana',(str) =>
     convertMana(str));
     
    await page2.exposeFunction('convertUSD',(str) =>
    convertUSD(str));
    
    await page2.exposeFunction('loanProposal',(str) =>
    loanProposal(str));

    await page2.exposeFunction('currentNftID',() =>
    currentNftID());
    
    
    let loansArray = []; // use it to store the NFT Bank estimates from For loop
    
    for (let index of parcelID ) {

        nftIDs.push(index); // push the Decentraland ID of the current loop into a global variable
        
        
        await page2.type('input[class="MultiSearch__SearchInput-vmef37-4 WKTfL"]',index);
        
        // Open drop-down to choose type of Decentraland asset
        await page2.waitForSelector('div[class="searchEstimateDappBox"]');
        await page2.click('div[class="searchEstimateDappBox"]');
        
        
        
        // Select type Parcel
        await page2.waitForSelector('body > div.MuiPopover-root > div.MuiPaper-root.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded > div > ul > li:nth-child(1) > p');
        await page2.click('body > div.MuiPopover-root > div.MuiPaper-root.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded > div > ul > li:nth-child(1) > p');
        
        // Search for asset with some timeouts to let the page2 load
        await page2.waitForSelector('button[class="searchBtn"]');
        await page2.waitForTimeout(3000);
        
        await page2.click('button[class="searchBtn"]');
        
        await page2.waitForSelector('div[id="CurrencyDropdownBtn"]');
        
        
        
        
        let loanEstimate = await page2.evaluate( async () => {
        
            //Selectors
            const manaSelector = '#__next > section > section.Layout__MainLayoutContainer-sc-1kezz9r-2.flTqTQ > section > div > main > section:nth-child(3) > section > article.DclParcelEstimate__EstimateBody-sc-1noyde4-3.bwqREQ > article.DclParcelEstimate__EstimatedPriceForm-sc-1noyde4-4.drwmyZ > div > h2';
            const usdSelector = 'div[class="estimatePrice"]';
            
            let getInnerText = selector =>{
                return document.querySelector(selector) ? document.querySelector(selector).innerText : false;
            }
            
            
            return{
                        manaEstimate: await convertMana(getInnerText(manaSelector)),
                        usdEstimate: await convertUSD(getInnerText(usdSelector)),
                        loan: await loanProposal(await convertUSD(getInnerText(usdSelector))),
                        dcID: await currentNftID()
                    }
                
                
            });
            
        loansArray.push(loanEstimate);


    }

    console.log(loansArray);
    debugger;   
    await browser.close();

        */

}

getPrices();


// exports.nft = async (req, res, next) => {
//     let loansArray = await getNFT();
//     res.status(200).json(loansArray);
//   };

