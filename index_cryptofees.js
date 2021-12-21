// Get all fees produced per protocol from cryptofees.info

const puppeteer = require('puppeteer');
const listOfDates = require('./listOfDates');

// URLs to scrape
// const cryptofeesURL = `https://cryptofees.info/history/2021-11-02`;
const cryptofeesURL = `https://cryptofees.info/history/`;

// console.log(listOfDates[1]);


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

    for (let i = 0; i<listOfDates.length; i++) {

        const nameSelector = `#__next > div > main > div.jsx-2013905549.list > a:nth-child(2) > div.jsx-166918656.name > div`;
        const feesSelector = `#__next > div > main > div.jsx-2013905549.list > a:nth-child(2) > div:nth-child(2)`;

        await page.goto(cryptofeesURL.concat(listOfDates[i]));
        await page.waitForSelector('div[class="jsx-2013905549 list"]');

        

        

    }

    await page.goto(cryptofeesURL);




        
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
    console.log("this is the array:", historyPrices);
    
    await browser.close();
    
    

}

getPrices();
