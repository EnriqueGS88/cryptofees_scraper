const protocols = require('./listOfProtocols');

let colors = [];

protocols.forEach( e => {
    let text = "const "+ e + "Color" + " = 'rgb(215, 31, 126)'";
    colors.push(text);
})

console.log(colors)