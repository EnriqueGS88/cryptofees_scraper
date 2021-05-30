// Udemy Tutorial
// https://www.udemy.com/course/nodejs-web-scraping/learn/lecture/12052210#overview

const puppeteer = require("puppeteer");

const url = "https://nftbank.ai/estimates";
const parcelID =
  "115792089237316195423570985008687907829450218981174871597021361487689354837877";
const parcelCoordinates = "-7,-139";

let convertMana = (str) => {
  let value = str.replace(",", "");
  return Number(value);
};

let convertUSD = (value) => {
  let index1 = value.search(/\$/);
  let index2 = value.search(/\)/);
  let temp = value.substring(index1 + 1, index2);
  let usd = temp.replace(",", "");

  return Number(usd);
};

let loanProposal = (usd) => {
  let commission = 0.02;
  let collateral = 0.5;
  let loan = (collateral - commission) * usd;

  return loan;
};

async function scrape() {
  const browser = await puppeteer.launch({
    headless: true,
    //Important
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();

  // Resize page to be viewed
  await page.setViewport({
    width: 1400,
    height: 900,
    deviceScaleFactor: 1,
  });

  await page.goto(url);

  // Enter Decentraland LAND to be searched for
  await page.waitForSelector(
    'input[class="MultiSearch__SearchInput-vmef37-4 WKTfL"]'
  );
  await page.type(
    'input[class="MultiSearch__SearchInput-vmef37-4 WKTfL"]',
    parcelID
  );

  // Open drop-down to choose type of Decentraland asset
  await page.waitForSelector('div[class="searchEstimateDappBox"]');
  await page.click('div[class="searchEstimateDappBox"]');

  // Select type Parcel
  await page.waitForSelector(
    "body > div.MuiPopover-root > div.MuiPaper-root.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded > div > ul > li:nth-child(1) > p"
  );
  await page.click(
    "body > div.MuiPopover-root > div.MuiPaper-root.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded > div > ul > li:nth-child(1) > p"
  );

  // Search for asset with some timeouts to let the page load
  await page.waitForSelector('button[class="searchBtn"]');
  await page.waitForTimeout(3000);

  await page.click('button[class="searchBtn"]');

  await page.waitForSelector('div[id="CurrencyDropdownBtn"]');
  //await page.click('div[id="CurrencyDropdownBtn"]');

  await page.exposeFunction("convertMana", (str) => convertMana(str));

  await page.exposeFunction("convertUSD", (str) => convertUSD(str));

  await page.exposeFunction("loanProposal", (str) => loanProposal(str));

  let details = await page.evaluate(async () => {
    //Selectors
    const manaSelector =
      "#__next > section > section.Layout__MainLayoutContainer-sc-1kezz9r-2.flTqTQ > section > div > main > section:nth-child(3) > section > article.DclParcelEstimate__EstimateBody-sc-1noyde4-3.bwqREQ > article.DclParcelEstimate__EstimatedPriceForm-sc-1noyde4-4.drwmyZ > div > h2";
    const usdSelector = 'div[class="estimatePrice"]';

    let getInnerText = (selector) => {
      return document.querySelector(selector)
        ? document.querySelector(selector).innerText
        : false;
    };

    return {
      manaEstimate: await convertMana(getInnerText(manaSelector)),
      usdEstimate: await convertUSD(getInnerText(usdSelector)),
      loan: await loanProposal(await convertUSD(getInnerText(usdSelector))),
    };
  });

  console.log(details);
  return details;
  // debugger;
}

exports.nft = async (req, res, next) => {
  let result = await scrape();
  res.status(200).json(result);
};

// async function converted() {

//     const a = await scrape();
//     console.log(a);

//     }

// converted();
