// Get All Decentraland LAND NFTs from nftfi.com and pass them to NFT Bank Estimates
// Use NFT Bank estimates to calculate loans

const puppeteer = require('puppeteer');
const convertMana = require('./convertMana');
const convertUSD = require('./convertUSD');
const loanProposal = require('./loanProposal');

// URLs to scrape
const decentraland = 'https://nftfi.com/app/lend/assets?category=0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d';
const nftBank = 'https://nftbank.ai/estimates';


// Selector to find the Decentraland object in nftfi.com
const dcSelector = '#root > div > div > div:nth-child(5) > main > ul > li:nth-child(1) > div > a';

// Convert functions to handle the API responses within Puppeteer browser

let currentNftID = () => {

    return nftIDs[nftIDs.length-1];

}

let nftIDs = []; // use it to store the Decentraland ID being queried in For loop in NFT Bank scraper


// Main Async function to scrape both sites

async function getNFT(){


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

    const page = await browser.newPage();

    await page.goto(decentraland);
    
    await page.waitForSelector(dcSelector);

    await page.exposeFunction('hrefArray',(arr) =>
        hrefArray(arr));

    await page.waitForSelector('a[class="asset__link"]')
 


    let parcelID = []; // use it to parse the Decentraland LAND NFTs in nftfi.com scraper

    let nodeList = await page.$$('ul[class="assets"]>li');

    for(let node of nodeList) {

        let href = await node.$eval('a[class="asset__link"]', element => element.getAttribute('href'));
        let index = href.lastIndexOf('/');
        let value = href.slice(index+1);
        
        parcelID.push(value);

    }
    console.log(parcelID);

    

    // Open a new page to scrape NFT Bank
    const page2 = await browser.newPage();
    
    // Intercept calls that load image, styles and font to improve bot performance
    await page.setRequestInterception(true);

    page.on('request', (request) => {

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

    
    await page.setRequestInterception(true);

    page.on('request', (request) => {

        if ( ['image','stylesheet','font'].includes(request.resourceType() ) ) {
            request.abort();
        } else {
            request.continue();
        }
    })


    
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


}

getNFT();


// exports.nft = async (req, res, next) => {
//     let loansArray = await getNFT();
//     res.status(200).json(loansArray);
//   };

