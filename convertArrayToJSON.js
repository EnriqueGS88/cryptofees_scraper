const listOfDates = require('./listOfDates');

// Convert Arrays to JSON with properties
const months = ["January", "February", "March", "April", "May", "June", "July"];
const uniData = [0, 10, 15, 20, 25, 30, 35];
const sushiData = [5, 15, 20, 17, 28, 29, 40];

let scrapeData = [
    [ '2021-12-31', 'Ethereum', '34347395' ],
    [ '2021-12-31', 'Uniswap', '4027706' ],
    [ '2021-12-31', 'Binance_Smart_Chain', '2574232' ],
    [ '2021-12-31', 'SushiSwap', '1289752' ],
    [ '2021-12-31', 'Aave', '1139513' ],
    [ '2021-12-31', 'Bitcoin', '814037' ],
    [ '2021-12-31', 'Trader_Joe', '796024' ],
    [ '2021-12-31', 'Compound', '728653' ],
    [ '2021-12-31', 'Balancer', '645590' ],
    [ '2021-12-31', 'Quickswap', '423483' ]
    [ '2021-12-31', 'Ethereum', '12345678' ],
    [ '2021-12-31', 'Uniswap', '90123456' ],
    [ '2021-12-31', 'Binance_Smart_Chain', '2574232' ],
    [ '2021-12-31', 'SushiSwap', '1289752' ],
    [ '2021-12-31', 'Aave', '1139513' ],
    [ '2021-12-31', 'Bitcoin', '814037' ],
    [ '2021-12-31', 'Trader_Joe', '796024' ],
    [ '2021-12-31', 'Compound', '728653' ],
    [ '2021-12-31', 'Balancer', '645590' ],
    [ '2021-12-31', 'Quickswap', '423483' ]
];

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

let data = ["A123,G,2323232", null, "F345,G,345667", "T677,G,-34343", "G454,G,4343", ""],

result = data
    .filter(Boolean)
    .map(s => {
        let [UserId, Type, Values] = s.match(/[^,]+/g);
        return { UserId, Type, Values };
});
                
// console.log(result);

// let converted = scrapeData.map( s => {
//     // let [date, protocol, fee] = s.match( /[^,]+/g );
//     return { date: s, protocol: s[0][1], fee: s[0][2]};
// });

// console.log( scrapeData[0][1] );

let ethereumData = [];
let uniswapData = [];
let jsonOutput = {
    "ethereumData": [],
    "uniswapData": []
};

let mapProtocolToJSON = ( data, row ) => {
    if ( data[row][1] == 'Ethereum' ) {

        let object = { "date": data[row][0], "fee": data[row][2] };
        jsonOutput.ethereumData.push( object );

    } else {

        if ( data[row][1] == 'Uniswap' ) {

            let object = { "date": data[row][0], "fee": data[row][2] };
            jsonOutput.uniswapData.push( object );
            
        } else {
            console.log( 'nothing' )
        }
        
    }
}

for ( let i = 0; i < 2; i++) {
    
    mapProtocolToJSON( scrapeData, i )
    
}

console.log( jsonOutput );







