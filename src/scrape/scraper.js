const puppeteer = require('puppeteer');
const convertMana = require('./convertMana');
const convertUSD = require('./convertUSD');
const loanProposal = require('./loanProposal');

// URLs to scrape
const decentraland = 'https://nftfi.com/app/lend/assets?category=0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d';
const nftBank = 'https://nftbank.ai/estimates';

let browser = null;
let page = null;
let page2 = null;

let parcelID = [];
let nodeList = null;
let loansArray = [];
let nftIDs = []; // use it to store the Decentraland ID being queried in For loop in NFT Bank scraper

let currentNftID = () => {

    return nftIDs[nftIDs.length-1];

}

const scraper = {

    goNFTfi: async() => {

        browser = await puppeteer.launch(
        
            {   
                headless: true,
                defaultViewport: {
                    width: 1400,
                    height: 900,
                    deviceScaleFactor: 1,
                }
            }
    
        );
    
        page = await browser.newPage();
    

        await page.setRequestInterception(true);

        page.on('request', (request) => {
    
            if ( ['image','stylesheet','font'].includes(request.resourceType() ) ) {
                request.abort();
            } else {
                request.continue();
            }
        })


        await page.goto(decentraland);

        await page.waitForSelector('a[class="asset__link"]');
        
    },


    getAssets: async() => {

        nodeList = await page.$$('ul[class="assets"]>li');
        
     
        for(let node of nodeList) {
    
            let href = await node.$eval('a[class="asset__link"]', element => element.getAttribute('href'));
            let index = href.lastIndexOf('/');
            let value = href.slice(index+1);
            
            parcelID.push(value);
    
        }

        console.log(parcelID);    
        
    },

    goNFTbank: async() => {

        page2 = await browser.newPage();
        //debugger;
        
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



    },

    exposeNFTbankFunctions: async() => {

        // Expose the Functions that are outside page2.Evaluate()
        await page2.exposeFunction('convertMana',(str) =>
        convertMana(str));
    
        await page2.exposeFunction('convertUSD',(str) =>
        convertUSD(str));

        await page2.exposeFunction('loanProposal',(str) =>
        loanProposal(str));

        await page2.exposeFunction('currentNftID',() =>
        currentNftID());

    },

    getEstimates: async() => {

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


    },

    showEstimates: async() => {

        console.log(loansArray);
        return loansArray;

    },

    end: async() => {

        await browser.close();

    }





};

module.exports = scraper;