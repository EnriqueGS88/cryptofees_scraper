const protocols = require('./listOfProtocols');

// Sample of the Element that this script should build
// {
//     label: 'Ethereum',
//     backgroundColor: EthereumColor,
//     borderColor: EthereumColor,
//     fill: false,
//     data: dataEthereum,
// }

const preffix = "{ ";
const suffix = " }";

let buildMapping = e => {
    let label = "label: '" + e + "' ,";
    let background = "backgroundColor: " + e + "Color" + ", ";
    let border = "borderColor: " + e + "Color" + ", ";
    let fill = "fill: false, ";
    let data = "data: data" + e + ", " 
    
    let mappedElement = (
        preffix + 
        label + 
        background + 
        border +
        fill +
        data +
        suffix 
    )

    return mappedElement
}

let mapped = protocols.map( p => {
    return buildMapping(p);
})

console.log(mapped)