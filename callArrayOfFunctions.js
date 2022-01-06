const scrapeData = require("./scrapeData");
const protocols = require("./listOfProtocols");

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



// 1) Loop to call function from an Array
for ( let i = 0; i < arrayOfFunctions.length; i++ ) {
    let object = 2
    const func = arrayOfFunctions[i];
    func(object);
};

// 2) ForEach loop to call functions from an Array
arrayOfFunctions.forEach( (func) => {
    let object = 2
    func(object);
});

// 3) Embed the above to call it with arguments
let mapProtocolToJSON = ( data, row ) => {

    let object = { "date": data[row][0], "fee": data[row][2] };
    let thisProtocol = data[row][1];
    let protocolIndex = protocols.indexOf( thisProtocol );

    let funcFromArray = arrayOfFunctions[ protocolIndex ];
    funcFromArray( object );

}

for ( let r = 0; r < scrapeData.length; r++) {
    mapProtocolToJSON( scrapeData, r)
}                       
                        
console.log( jsonOutput );