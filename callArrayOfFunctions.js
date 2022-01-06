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

let arrayOfFunctions = [

];


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
                
            } else { }
        }
    }
}
