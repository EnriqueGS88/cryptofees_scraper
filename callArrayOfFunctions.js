const scrapeData = require("./scrapeData");

// Define structure for the output json
let jsonOutput = {
    "ethereumData": [],
    "uniswapData": [],
    "binance_Smart_ChainData": [],
};

// List the buckets/protocols that will receive the mapped data
let protocols = [
    'Ethereum',
    'Uniswap',
    'Binance_Smart_Chain',
];

let ethereumPush = ( obj ) => {
    jsonOutput.ethereumData.push( obj );
}

let uniswapPush = ( obj ) => {
    jsonOutput.uniswapData.push( obj );
}

let binanceSmartChainPush = ( obj ) => {
    jsonOutput.binance_Smart_ChainData.push( obj );
}

const arrayOfFunctions = [
    ethereumPush,
    uniswapPush,
    binanceSmartChainPush,
];

// 1) Loop to call function from an Array
// for ( let i = 0; i < arrayOfFunctions.length; i++ ) {
//     let object = 2
//     const func = arrayOfFunctions[i];
//     func(object);
// };

// 2) ForEach loop to call functions from an Array
// arrayOfFunctions.forEach( (func) => {
//     let object = 2
//     func(object);
// });

// 3) Embed the above to call it with arguments
let mapProtocolToJSON = ( data, row ) => {

    let object = { "date": data[row][0], "fee": data[row][2] };
    let thisProtocol = data[row][1];
    let protocolIndex = protocols.indexOf( thisProtocol );

    let funcFromArray = arrayOfFunctions[ protocolIndex ];
    funcFromArray( object );

}

for ( let r = 0; r < 3; r++) {
    mapProtocolToJSON( scrapeData, r)
}                       
                        
// console.log( jsonOutput );


let getProtocols = [];

scrapeData.forEach( (day) => {
    if ( getProtocols.indexOf( day[1] ) >= 0 ) {      
    
    } else {
        
        getProtocols.push( day[1] );

    }

})

console.log( getProtocols );