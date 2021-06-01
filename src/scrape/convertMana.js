

let convertMana = (str) => {
    let value = str.replace(",","");
    return Number(value);
};

module.exports = convertMana;