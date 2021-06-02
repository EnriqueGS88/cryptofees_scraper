// Get All Decentraland LAND NFTs from nftfi.com and pass them to NFT Bank Estimates
// Use NFT Bank estimates to calculate loans

const scraper = require('./scraper');

// Main Async function to scrape both sites

async function getNFT(){

    
    await scraper.goNFTfi();
    
    await scraper.getAssets();
        
    await scraper.goNFTbank();
     
    await scraper.exposeNFTbankFunctions();
    
    await scraper.getEstimates();

    await scraper.showEstimates();

    await scraper.end();


}

getNFT();

// exports.nft = async (req, res, next) => {
//     let loansArray = await getNFT();
//     res.status(200).json(loansArray);
//   };

