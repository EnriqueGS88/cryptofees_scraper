
let convertUSD = (value) => {
    let index1 = value.search(/\$/);
    let index2 = value.search(/\)/);
    let temp = value.substring(index1+1,index2);
    let usd = temp.replace(",","");

    return Number(usd);
}

module.exports = convertUSD;