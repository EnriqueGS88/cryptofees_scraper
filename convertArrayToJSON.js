// Convert Arrays to JSON with properties
const listOfDates = require('./listOfDates');
const scrapeData = require( './scrapeData' );
const protocols = require('./listOfProtocols');

const months = ["January", "February", "March", "April", "May", "June", "July"];
const uniData = [0, 10, 15, 20, 25, 30, 35];
const sushiData = [5, 15, 20, 17, 28, 29, 40];
const jsonFile = {
    "ethereumArray": [{
       date: '2021-12-29',
       fee: 100
    }, {
        date: '2021-12-30',
        fee: 110
    }, {
        date: '2021-12-31',
        fee: 250
    }],
    "sushiArray": [{
        date: '2021-12-29',
        fee: 50
     }, {
         date: '2021-12-30',
         fee: 195
     }, {
         date: '2021-12-31',
         fee: 70
     }],
     "uniArray": [{
        date: '2021-12-29',
        fee: 50
     }, {
         date: '2021-12-30',
         fee: 110
     }, {
         date: '2021-12-31',
         fee: 280
     }]
};

// Define structure for the output json
// In this data structure the scraped data will be stored
let jsonOutput = {
    "ethereumData": [],
    "uniswapData": [],
    "binance_Smart_ChainData": [],
    "sushiswapData": [],
    "aaveData": [],
    "bitcoinData": [],
    "trader_JoeData": [],
    "compoundData": [],
    "balancerData": [],
    "quickswapData": [],
};

// List of Functions to be called according to the type of data being scraped

let ethereumPush = ( obj ) => {
    jsonOutput.ethereumData.push( obj );
}

let uniswapPush = ( obj ) => {
    jsonOutput.uniswapData.push( obj );
}

let binanceSmartChainPush = ( obj ) => {
    jsonOutput.binance_Smart_ChainData.push( obj );
}

let sushiswapPush = ( obj ) => {
    jsonOutput.sushiswapData.push( obj );
}

let aavePush = ( obj ) => {
    jsonOutput.aaveData.push( obj );
}

let bitcoinPush = ( obj ) => {
    jsonOutput.bitcoinData.push( obj );
}

let trader_JoePush = ( obj ) => {
    jsonOutput.trader_JoeData.push( obj );
}

let compoundPush = ( obj ) => {
    jsonOutput.compoundData.push( obj );
}

let balancerPush = ( obj ) => {
    jsonOutput.balancerData.push( obj );
}

let quickswapPush = ( obj ) => {
    jsonOutput.quickswapData.push( obj );
}

// Array that stores the functions that will be called
const arrayOfFunctions = [
    ethereumPush,
    uniswapPush,
    binanceSmartChainPush,
    sushiswapPush,
    aavePush,
    bitcoinPush,
    trader_JoePush,
    compoundPush,
    balancerPush,
    quickswapPush,
];

// Main function that calls the other functions in the Array
// It maps the scraped data to the corresponding array within the jsonOutput object
let mapProtocolToJSON = (data, row ) => {

    let object = { "date": data[row][0], "fee": Number( data[row][2] ) };
    let thisProtocol = data[row][1];
    let protocolIndex = protocols.indexOf( thisProtocol );

    let funcFromArray = arrayOfFunctions[protocolIndex];
    funcFromArray( object )

}

// Loop to evaluate each position in the scrapeData
for ( let r = 0; r < scrapeData.length ; r++ ) {
    mapProtocolToJSON( scrapeData, r );
}

console.log( jsonOutput );










