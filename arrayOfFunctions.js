// Array of Functions to be imported and called


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

module.exports = [
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