// Convert Arrays to JSON with properties
const listOfDates = require('./listOfDates');
const scrapeData = require( './scrapeData' );

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

// Split the array positions by the comma in the string
let data = ["A123,G,2323232", null, "F345,G,345667", "T677,G,-34343", "G454,G,4343", ""],

result = data
    .filter(Boolean)
    .map(s => {
        let [UserId, Type, Values] = s.match(/[^,]+/g);
        return { UserId, Type, Values };
});                
// console.log(result);


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
]

let mapProtocolToJSON = ( data, row ) => {

    if ( data[row][1] == 'Ethereum' ) {

        let object = { "date": data[row][0], "fee": data[row][2] };
        jsonOutput.ethereumData.push( object );

    } else {

        if ( data[row][1] == 'Uniswap' ) {

            let object = { "date": data[row][0], "fee": data[row][2] };
            jsonOutput.uniswapData.push( object );
            
        } else {

            if ( data[row][1] == 'Binance_Smart_Chain' ) {

                let object = { "date": data[row][0], "fee": data[row][2] };
                jsonOutput.binance_Smart_ChainData.push( object );
                
            } else {
                console.log( 'n/a' )
            }
        }
    }
}

// Evaluate each node in the scrapeData
// Map it to the corresponding protocol array in the json output file
for ( let r = 0; r < scrapeData.length ; r++ ) {
    mapProtocolToJSON( scrapeData, r );
}

console.log( jsonOutput );









